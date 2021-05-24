import axios from 'axios';
import { isAutheticated } from '../Auth/Auth';

export const http =  axios.create({
    baseURL: process.env.REACT_APP_SERVER,
});

http.interceptors.request.use((config) => {
    let user = isAutheticated()
    if(user){
        config.headers.Authorization = `Bearer ${isAutheticated().token}`
    }
    return config
}, (err) => {
    return Promise.reject(err)
})
