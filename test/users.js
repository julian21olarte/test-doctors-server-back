'use strict';
const mongoose = require('mongoose');
let admin = {
    _id: mongoose.Types.ObjectId('000000000000000000000001'),
    role: 'ADMIN',
    username: 'granactate',
    password: 'granactate'
  };
let app = {
    _id: mongoose.Types.ObjectId('000000000000000000000002'),
    role: 'APP',
    username: 'granactate_app',
    password: 'granactate'
};
let doctor = {
    _id: mongoose.Types.ObjectId('000000000000000000000003'),
    role: 'DOCTOR',
    username: 'granactate_doctor',
    password: 'granactate'
};

module.exports = {
    ADMIN: admin,
    DOCTOR: doctor,
    APP: app,
    CREDENTIALS: function(user) {
        return {username: user.username, password: user.password};
    }
};