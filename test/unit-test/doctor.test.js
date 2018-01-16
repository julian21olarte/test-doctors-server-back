'use strict';
const should = require('should');
const request = require('request');
const assert = require('assert');
const _ = require('lodash');
const app = require('../../app');
const mongoose = require('mongoose');
const users = require('../users');


describe('Doctors tests', function() {

  describe('should NOT can access to doctors api when not exits user logged', () => {
    it('should not can access to view the doctors if the admin is not logged', function(done) {
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
  });



  describe('should access to doctors api with a ADMIN logged', () => {
    before(() => {
      app.use(function(req, res, next) {
        req.session.user = users.ADMIN;
        next();
      })
    });
    
    it('test /api/doctor/ with ADMIN logged', () => {
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


    it('test /api/doctor/:id with ADMIN logged', () => {
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


    it('test /api/doctor/save with ADMIN logged', () => {
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
          return should.not.exist(err);
        }
        should(httpResponse).has.property('statusCode', 200);
        done();
      });
    });



  });

  
});