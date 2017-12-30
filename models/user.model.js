'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
  role: {type: String, required: true},
  username: { type: String, required: true },
  password: { type: String, required: true }
});



UserSchema.statics.login = function(data) {
  return this.findOne({username: data.username, password: data.password})
  .then((user) => {
      return user ? user : null;
  })
}


module.exports = mongoose.model('User', UserSchema);