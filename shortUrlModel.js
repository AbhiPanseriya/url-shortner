const mongoose = require('mongoose');

const shortUrlSchema = mongoose.Schema({
    title: {
        type: String,
        require: false
    },
    url: {
        type: String,
        require: true
    },
    short: {
        type: String,
        require: true
    },
    user: {
        type: {
            name: String,
            email: String
        },
        require: true
    },
    description: {
        type: String,
        require: false
    },
    clicks: {
        type: Number,
        require: true,
        default: 0
    },
    createdAt: {
        type: Date,
        require: true,
        default: new Date()
    }
});
module.exports = mongoose.model('ShortUrl', shortUrlSchema);