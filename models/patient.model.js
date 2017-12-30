'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PatientSchema = Schema({
  name: {type: String, required: true},
  username: {type: String, required: true},
  password: { type: String, required: true },
  phone: { type: Number, required: true },
  dateOfBirth : { type: Date, required: true },
  document : { type: String, required: true, unique: true },
  glucose: [
    {
      value: {type: Number, required: true},
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now }
    }
  ]
});


module.exports = mongoose.model('Patient', PatientSchema);