const { response } = require('express');
const User = require('../models/User.js');
module.exports = (request, response) => {
    User.create(request.body, (error, user) => {
        // console.log(error);
        if(error) {
            return response.redirect('/auth/register');
        }
        response.redirect('/home')
    })
}