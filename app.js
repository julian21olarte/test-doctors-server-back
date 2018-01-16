'use strict';
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var http = require('http');
var port = process.env.PORT || '3000';
var database = require('./database/config');


var doctor = require('./routes/doctor.routes.js');
var patient = require('./routes/patient.routes.js');
var auth = require('./routes/auth.routes.js');


var app = express();

//app.use(session({secret: 'julian21olarte', saveUninitialized: true, resave: true}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


//routes
app.use('/api/doctor', doctor);
app.use('/api/patient', patient);
app.use('/auth', auth);


//server
var server = app.listen(port, () => {
  console.log("Server listening on " + port)
});
app.stop = function() {
  server.close();
}

module.exports = app;
