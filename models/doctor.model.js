'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DoctorSchema = Schema({
  name: {type: String, required: true},
  username: {type: String, required: true},
  password: { type: String, required: true },
  phone: { type: Number, required: true },
});


module.exports = mongoose.model('Doctor', DoctorSchema);