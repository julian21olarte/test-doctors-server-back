'use strict';
const should = require('should');
const request = require('request');
const assert = require('assert');
const _ = require('lodash');
const app = require('../../app');
const mongoose = require('mongoose');
const users = require('../users');


describe('Doctors tests', function() {

  describe('should NOT can access to doctors api when not exits user logged', function() {
    before(function() {
      
    });
    it('should not can access to /api/doctor/ endpoint if the admin is not logged', function(done) {
      let options = {
        url : 'http://localhost:3000/api/doctor/'
      };
      request.get(options, function (err, httpResponse, body) {
        if (err) {
          return should.not.exist(err);
        }
        should(httpResponse).has.property('statusCode', 401);
        done();
      });
    });
    it('should not can access to /api/doctor/:id endpoint if the admin is not logged', function(done) {
      let options = {
        url : 'http://localhost:3000/api/doctor/' + users.DOCTOR._id
      };
      request.get(options, function (err, httpResponse, body) {
        if (err) {
          return should.not.exist(err);
        }
        should(httpResponse).has.property('statusCode', 401);
        done();
      });
    });
    it('should not can access to /api/doctor/save endpoint if the admin is not logged', function(done) {
      let doctor = {
        role: 'DOCTOR',
        username: 'alejandro molina',
        password: 'alejandromolina'
      };
      let options = {
        url : 'http://localhost:3000/api/doctor/save',
        form: {doctor}
      };
      request.post(options, function (err, httpResponse, body) {
        if (err) {
          return should.not.exist(err);
        }
        should(httpResponse).has.property('statusCode', 401);
        done();
      });
    });
    it('should not can access to /api/doctor/edit endpoint if the admin is not logged', function(done) {
      let doctor = users.DOCTOR;
      let doctorId = doctor._id;
      doctor.password = 'nuevopasswordeditado';
      let options = {
        url : 'http://localhost:3000/api/doctor/edit',
        form: {doctor, doctorId}
      };
      request.put(options, function (err, httpResponse, body) {
        if (err) {
          return should.not.exist(err);
        }
        should(httpResponse).has.property('statusCode', 401);
        done();
      });
    });
  });



  describe('should access to doctors api with a ADMIN logged', function() {
    before(function() {
      this.timeout(8000);
      app.use(function(req, res, next) {
        req.session.user = users.ADMIN;
      });
    });
    
    it('test /api/doctor/ with ADMIN logged', function(done) {
      let options = {
        url : 'http://localhost:3000/api/doctor/'
      };
      request.get(options, function (err, httpResponse, body) {
        if (err) {
          return should.not.exist(err);
        }
        should(httpResponse).has.property('statusCode', 200);
        done();
      });
    });


    it('test /api/doctor/:id with ADMIN logged', function(done) {
      let options = {
        url : 'http://localhost:3000/api/doctor/' + users.ADMIN._id
      };
      request.get(options, function (err, httpResponse, body) {
        if (err) {
            return should.not.exist(err);
            }
        should(httpResponse).has.property('statusCode', 200);
        done();
      });
    });


    it('test /api/doctor/save with ADMIN logged', function(done) {
      let doctor = {
        role: 'DOCTOR',
        username: 'julian olarte',
        password: 'julian21olarte'
      };
      let options = {
        url : 'http://localhost:3000/api/doctor/save/',
        form: {doctor}
      };
      request.post(options, function (err, httpResponse, body) {
        if (err) {
          console.log(httpResponse);
          return should.not.exist(err);
        }
        should(httpResponse).has.property('statusCode', 200);
        done();
      });
    });
    
    
    it('test /api/doctor/edit with ADMIN logged', function(done) {
      let doctor = users.DOCTOR;
      let doctorId = doctor._id;
      doctor.password = 'passwordactualizado';
      let options = {
        url : 'http://localhost:3000/api/doctor/edit/',
        form: {doctor, doctorId}
      };
      request.put(options, function (err, httpResponse, body) {
        if (err) {
          return should.not.exist(err);
        }
        should(httpResponse).has.property('statusCode', 200);
        done();
      });
    });
  });
});