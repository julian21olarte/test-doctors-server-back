'use strict';
var db_config = require('../db.config');
var mongoose = require('mongoose');
var mongo_url = db_config.test;

//MongoDB Setup (Mongoose)

mongoose.Promise = global.Promise;
mongoose.connect(mongo_url, {useMongoClient: true})
.then( () => {
    console.log('Conexion a DB correcta...');
})
.catch(err => console.log(err));
