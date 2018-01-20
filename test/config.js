'use strict';
const server = require('../app');
const mongoose = require('mongoose');
const db_config = require('../db.config');
const users = require('./util').users;
const userModel = require('../models/user.model');

const mongo_url = db_config.test;
before(function (done) {
    this.timeout(1000000);
    clearDb(function () {
        userModel.create(Object.values(users), function(err) {
            if(err) {
                throw err;
            }
            done();
        });
    });
});

after(function (done) {
    this.timeout(1000000);
    clearDb(function () {
        server.stop();
        done();
    });
});

function clearDb(callback) {
    mongoose.connect(mongo_url, function () {
        mongoose.connection.db.dropDatabase(callback);
    });
}