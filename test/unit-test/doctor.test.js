'use strict';
const should = require('should');
const assert = require('assert');
const _ = require('lodash');
const util = require('../util');
const users = util.users;
const doctors = util.doctors;
const mongoose = require('mongoose');
const app = require('../../app');
var request = require('supertest');


describe('Doctors tests', function() {
  before(function() {
    request = request.agent(app);
  });
  describe('should NOT can access to doctors api when not exits user logged', function() {
    it('should NOT can access (401 Unauthenticate) to /api/doctor/ endpoint if the admin is not logged', function(done) {
      this.timeout(80000);
      let options = {
        url : '/api/doctor/'
      };
      request
      .get(options.url)
      .expect(401)
      .end(function(err, res) {
        if(err) {
          throw err;
        }
        done();
      });
    });
    it('should NOT can access (401 Unauthenticate) to /api/doctor/save endpoint if the admin is not logged', function(done) {
      let doctor = doctors.doctor_1;
      let options = {
        url : '/api/doctor/save',
        form: {doctor}
      };
      request
      .post(options.url)
      .send(options.form)
      .expect(401)
      .end(function(err, res) {
        if(err) {
          throw err;
        }
        done();
      });
    });
    it('should NOT can access (401 Unauthenticate) to /api/doctor/:id endpoint if the admin is not logged', function(done) {
      let options = {
        url : '/api/doctor/' + doctors.doctor_1._id
      };
      request
      .get(options.url)
      .expect(401)
      .end(function(err, res) {
        if(err) {
          throw err;
        }
        done();
      });
    });
    
    it('should NOT can access (401 Unauthenticate) to /api/doctor/edit endpoint if the admin is not logged', function(done) {
      let doctor = doctors.doctor_1;
      let doctorId = doctor._id;
      doctor.password = 'nuevopasswordeditado';
      let options = {
        url : '/api/doctor/edit',
        form: {doctor, doctorId}
      };
      request
      .put(options.url)
      .send(options.form)
      .expect(401)
      .end(function(err, res) {
        if(err) {
          throw err;
        }
        done();
      });
    });
  });



  describe('should can access (200 OK) to doctors api with a ADMIN logged', function() {
    before(function(done) {
      this.timeout(80000);
      let options = {
          url: '/auth/login',
          form: util.CREDENTIALS(users.ADMIN)
      }
      request
      .post(options.url)
      .send(options.form)
      .expect(200)
      .end(function(err, res) {
          if (err) {
              throw err;
          }
          done();
      });
    });
    
    it('test /api/doctor/ with ADMIN logged', function(done) {
      let options = {
        url : '/api/doctor/'
      };
      request
      .get(options.url)
      .expect(200)
      .end(function(err, res) {
        if(err) {
          throw err;
        }
        done();
      });
    });

    
    it('test /api/doctor/save with ADMIN logged', function(done) {
      let doctor = doctors.doctor_1;
      let options = {
        url : '/api/doctor/save/',
        form: {doctor}
      };
      request
      .post(options.url)
      .send(options.form)
      .expect(200)
      .end(function(err, res) {
        if(err) {
          throw err;
        }
        done();
      });
    });

    it('test /api/doctor/:id with ADMIN logged', function(done) {
      let options = {
        url : '/api/doctor/' + doctors.doctor_1._id
      };
      request
      .get(options.url)
      .expect(200)
      .end(function(err, res) {
        if(err) {
          throw err;
        }
        done();
      });
    });


    
    
    it('test /api/doctor/edit with ADMIN logged', function(done) {
      this.timeout(80000);
      let doctor = doctors.doctor_1;
      let doctorId = doctor._id;
      doctor.password = 'passwordactualizado';
      let options = {
        url : '/api/doctor/edit/',
        form: {doctor, doctorId}
      };
      request
      .put(options.url)
      .send(options.form)
      .expect(200)
      .end(function(err, res) {
        if(err) {
          throw err;
        }
        done();
      });
    });
  });
});