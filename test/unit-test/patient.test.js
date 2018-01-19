'use strict';
const should = require('should');
const assert = require('assert');
const _ = require('lodash');
const util = require('../util');
const users = util.users;
const patients = util.patients;
const mongoose = require('mongoose');
const app = require('../../app');
var request = require('supertest');



describe('Patient tests', function() {
    before(function() {
        this.timeout(80000);
        request = request.agent(app);
    });
    describe('should NOT can access to patients api when not exits user logged', function() {
        it('should not can access to /api/patient/ endpoint if the admin is not logged', function(done) {
            let options = {
              url : '/api/patient/'
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
        it('should not can access to /api/patient/:id endpoint if the admin is not logged', function(done) {
            let options = {
              url : '/api/patient/'+ patients.patient_1._id
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
        it('should not can access to /api/patient/byDocument/:id endpoint if the admin is not logged', function(done) {
            let options = {
              url : '/api/patient/byDocument/'+ patients.patient_1.document
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
        it('should not can access to /api/patient/save endpoint if the admin is not logged', function(done) {
            let patient = patients.patient_1;
            let options = {
              url : '/api/patient/save/',
              form: {patient}
            };
            request
            .post(options.url)
            .expect(401)
            .end(function(err, res) {
              if(err) {
                throw err;
              }
              done();
            });
        });
        it('should not can access to /api/patient/edit endpoint if the admin is not logged', function(done) {
            
            let patient = patients.patient_1;
            let patientId = patient._id;
            let options = {
              url : '/api/patient/edit/',
              form: {patient, patientId}
            };
            request
            .put(options.url)
            .expect(401)
            .end(function(err, res) {
              if(err) {
                throw err;
              }
              done();
            });
        });
    });
    describe('should can access to patients api with doctor user logged', function() {
        before(function(done) {
            this.timeout(80000);
            let options = {
                url: '/auth/login',
                form: util.CREDENTIALS(users.DOCTOR)
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
        it('should can access to /api/patient/ endpoint if a doctor is logged', function(done) {
            let options = {
              url : '/api/patient/'
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
        it('should can access to /api/patient/save endpoint if a doctor is logged', function(done) {
            let patient = patients.patient_1;
            let options = {
              url : '/api/patient/save/',
              form: {patient}
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
        it('should can access to /api/patient/:id endpoint if a doctor is logged', function(done) {
            let options = {
              url : '/api/patient/'+ patients.patient_1._id
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
        it('should can access to /api/patient/byDocument/:id endpoint if a doctor is logged', function(done) {
            let options = {
              url : '/api/patient/byDocument/'+ patients.patient_1.document
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
        
        it('should can access to /api/patient/edit endpoint if a doctor is logged', function(done) {
            
            let patient = patients.patient_1;
            let patientId = patient._id;
            let options = {
              url : '/api/patient/edit/',
              form: {patient, patientId}
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