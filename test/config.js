'use strict';
const server = require('../app');
const mongoose = require('mongoose');
const db_config = require('../db.config');
const users = require('./util').users;
const userModel = require('../models/user.model');

const mongo_url = db_config.test;
before(function() {
    userModel.create(Object.values(users));
});

after(function(done) {
    this.timeout(1000000);
    mongoose.connect(mongo_url, function(){
        mongoose.connection.db.dropDatabase(function(){
            server.stop();
            done();
        });   
    });
});