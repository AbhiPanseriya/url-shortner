require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');
const ShortUrl = require('./shortUrlModel');

const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

// to validate user and get their name and email address
const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token) return res.sendStatus(401);
    
    const validateURL = `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`;
    try {
        const response = await axios.get(validateURL);
        if(response?.data?.email_verified !== 'true') return res.sendStatus(403);
        if(!response.data.email) return res.sendStatus(401);
        req.user = {
            email: response.data.email,
            picture: response.data.picture,
            name: response.data.name
        };
    } catch (error) {  
        return res.sendStatus(401);
    }

    next();

}

app.get('/', authenticateToken, (req, res) => {
    res.send("You're logged in");
});

//save url
app.post('/su', authenticateToken, async (req, res) => {
    if(!req.body) return res.sendStatus(422);
    if(!req.body.url.startsWith('http://') && !req.body.url.startsWith('https://')) 
    req.body.url = `http://${req.body.url}`;
    ShortUrl.create({
        title: req.body.title || req.body.url,
        url: req.body.url,
        short: req.body.short,
        user: {
            name: req.user.name,
            email: req.user.email
        },
        description: req.body.description,
    });
    const responseData = await ShortUrl.findOne({
        short: req.body.short,
        user: {
            name: req.user.name,
            email: req.user.email
        }
    });
    res.send(responseData);

    
});
//look up
app.get('/lu', authenticateToken, async (req, res) => {

    const lookup = req.query.q;
    if(!lookup || lookup.length <= 4) res.sendStatus(204);
    const isExist = await ShortUrl.find({short: lookup});

    res.send(isExist.length ? false : true);
});
//update url
app.post('/uu', authenticateToken, async (req, res) => {
    if(!req.body) return res.sendStatus(422);
    if(!req.body.url.startsWith('http://') && !req.body.url.startsWith('https://')) 
        req.body.url = `http://${req.body.url}`;
    const link = await ShortUrl.findOne({_id: req.body._id});
    link.title = req.body.title || req.body.url;
    link.url = req.body.url;
    link.short = req.body.short;
    link.description = req.body.description;
    await link.save();

    const response = await ShortUrl.findOne({
        _id: req.body._id
    });
    res.send(response);

});
//get url
app.get('/gu', authenticateToken, async (req, res) => {
    const data = await ShortUrl.find({ user: {name: req.user.name, email: req.user.email}} ).sort({'createdAt': -1});

    return res.send(data);
});

//redirect
app.set('view engine', 'ejs')
app.get('/:redirect', async (req, res) => {
    const link = await ShortUrl.findOne({short: req.params.redirect});
    if(link == null) return res.sendStatus(404); 

    link.clicks++;
    await link.save();

    res.render('template', {redirectUrl: link.url});
});
app.listen(process.env.PORT || 4000);

