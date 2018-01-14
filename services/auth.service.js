'use strict';
var userModel = require('../models/user.model');


function login(credentials) {
    return userModel.findOne(credentials);
}


module.exports = {
    login
}