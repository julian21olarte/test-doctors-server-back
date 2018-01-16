'use strict';
const server = require('../app');
const mongoose = require('mongoose');
const db_config = require('../db.config');

const mongo_url = db_config.test;

after(() => {
    server.stop();
});