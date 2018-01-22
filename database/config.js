'use strict';
var db_config = require('../db.config');
var mongoose = require('mongoose');
var mongo_url = db_config.dev;

//MongoDB Setup (Mongoose)

mongoose.Promise = global.Promise;
mongoose.connect(mongo_url)
.then( () => {
    console.log('Conexion a DB correcta...');
})
.catch(err => console.log(err));
