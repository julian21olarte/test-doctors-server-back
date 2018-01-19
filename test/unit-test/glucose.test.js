'use strict';
const should = require('should');
const assert = require('assert');
const _ = require('lodash');
const util = require('../util');
const users = util.users;
const doctors = util.doctors;
const patients = util.patients;
const mongoose = require('mongoose');
const app = require('../../app');
var request = require('supertest');


describe('Glucose tests', function () {
  before(function (done) {
    request = request.agent(app);
    this.timeout(80000);
    let options = {
      url: '/auth/login',
      form: util.CREDENTIALS(users.DOCTOR)
    }
    request
      .post(options.url)
      .send(options.form)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          throw err;
        }
        done();
      });
  });
  describe('should can access (200) to glucose api with DOCTOR user logged', function () {
    before(function (done) {
      this.timeout(80000);

      let patient = patients.patient_1;
      let options = {
        url: '/api/patient/save/',
        form: { patient }
      };
      request
        .post(options.url)
        .send(options.form)
        .expect(200)
        .end(function (err) {
          if (err) {
            throw err;
          }
          done();
        });
    });

    it('should can access (200 OK) to /api/patient/:id/glucose endpoint if the DOCTOR user is logged', function (done) {
      this.timeout(80000);
      let patientId = patients.patient_1._id;
      let options = {
        url: `/api/patient/${patientId}/glucose/`
      };
      request
        .get(options.url)
        .expect(200)
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          done();
        });
    });

    it('should can access (200 OK) to /api/patient/glucose endpoint if the DOCTOR user is logged', function (done) {
      this.timeout(80000);
      let glucose = patients.patient_1.glucose[0];
      let patientId = patients.patient_1._id;
      let options = {
        url: '/api/patient/glucose/',
        form: { glucose, patientId }
      };
      request
        .post(options.url)
        .send(options.form)
        .expect(200)
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          done();
        });
    });

    it('should can access (200 OK) to /api/patient/glucose/edit endpoint if the DOCTOR user is logged', function (done) {
      let glucose = patients.patient_1.glucose[0];
      let patientId = patients.patient_1._id;
      let glucoseId = glucose._id;

      //edit glucose object
      glucose.value = 99;

      let options = {
        url: '/api/patient/glucose/edit/',
        form: { glucose, patientId, glucoseId }
      };
      request
        .put(options.url)
        .send(options.form)
        .expect(200)
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          done();
        });
    });
  });
  describe('should NOT can access to glucose api when not exits user logged', function () {
    before(function (done) {
      let options = {
        url: '/auth/logout',
      }
      request
        .post(options.url)
        .expect(200)
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          done();
        });
    });
    it('should NOT can access (401 Unauthenticate) to /api/patient/:id/glucose endpoint if the admin is not logged', function (done) {
      this.timeout(80000);
      let patient = patients.patient_1;
      let patientId = patients.patient_1._id;
      let options = {
        url: `/api/patient/${patientId}/glucose`
      };
      request
        .get(options.url)
        .expect(401)
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          done();
        });
    });
    it('should NOT can access (401 Unauthenticate) to /api/patient/glucose endpoint if the admin is not logged', function (done) {
      let glucose = patients.patient_1.glucose[0];
      let patientId = patients.patient_1._id;
      let options = {
        url: '/api/patient/glucose',
        form: { glucose, patientId }
      };
      request
        .post(options.url)
        .send(options.form)
        .expect(401)
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          done();
        });
    });

    it('should NOT can access (401 Unauthenticate) to /api/patient/glucose/edit endpoint if the admin is not logged', function (done) {
      let glucose = patients.patient_1.glucose[0];
      let patientId = patients.patient_1._id;
      let glucoseId = glucose._id;

      //edit glucose object
      glucose.value = 99;

      let options = {
        url: '/api/patient/glucose/edit',
        form: { glucose, patientId, glucoseId }
      };
      request
        .put(options.url)
        .send(options.form)
        .expect(401)
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          done();
        });
    });
  });

});