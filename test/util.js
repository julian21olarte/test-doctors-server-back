'use strict';
const mongoose = require('mongoose');


//users
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

//doctors
let doctor1 = {
    _id: mongoose.Types.ObjectId('111111111111111111111111'),
    name: 'julian olarte',
    username: 'granactate_doctor',
    password: 'granactate',
    phone: '333333333'
};

module.exports = {
    users: {
        ADMIN: admin,
        DOCTOR: doctor,
        APP: app,
    },
    doctors: {
        doctor_1: doctor1
    },
    CREDENTIALS: function(user) {
        return {username: user.username, password: user.password};
    }
};