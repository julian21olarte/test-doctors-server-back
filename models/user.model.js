'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
  role: {type: String, required: true},
  username: { type: String, required: true },
  password: { type: String, required: true }
});


module.exports = mongoose.model('User', UserSchema);