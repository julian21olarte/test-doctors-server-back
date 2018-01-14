'use strict';
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var db_config = require('./db.config');

var doctor = require('./routes/doctor.routes.js');
var patient = require('./routes/patient.routes.js');
var auth = require('./routes/auth.routes.js');

//MongoDB Setup (Mongoose)
var mongoose = require('mongoose');
var mongo_url = db_config.test;
mongoose.Promise = global.Promise;
mongoose.connect(mongo_url)
  .then( () => {
    console.log('Conexion a DB correcta...');
  })
  .catch(err => console.log(err));


var app = express();

//app.use(session({secret: 'julian21olarte', saveUninitialized: true, resave: true}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


//routes
app.use('/api/status',(req, res) => res.send({status : 'OK', time : Date.now()}))
app.use('/api/doctor', doctor);
app.use('/api/patient', patient);
app.use('/auth', auth);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
