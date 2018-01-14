'use strict';
const should = require('should');
const request = require('request');
const assert = require('assert');
const _ = require('lodash');

var userModel = require('../models/user.model');

describe('Auth login test', function() {
    let admin = {
        role: 'ADMIN',
        username: 'granactate',
        password: 'granactate'
    };
    let app = {
        role: 'APP',
        username: 'granactate_app',
        password: 'granactate'
    };
    let doctor = {
        role: 'DOCTOR',
        username: 'granactate_doctor',
        password: 'granactate'
    };
    let users = [];
    users.push(admin, app, doctor);

    before('before hook', function(done) {
        this.timeout(800000000);
       let User = new userModel(admin);
       User.save(function(err, resp) {
           if(err) {
               done(err);
           }
           done();
       });
    });

    
    it('should login with admin account', function(done) {
        this.timeout(80000);
        let options = {
            url: 'http://localhost:3000/auth/login',
            form: admin
        }
        request.post(options, (err, httpResponse, body) => {
            if(err) {
                return should.not.exist(err);
            }
            should(httpResponse).has.property('statusCode', 200);
            done();
        });
    });

});