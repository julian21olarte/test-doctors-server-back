'use strict';
const should = require('should');
const assert = require('assert');
const _ = require('lodash');
const util = require('../util');
const users = util.users;
const app = require('../../app');
var request = require('supertest');

const userModel = require('../../models/user.model');

describe('Auth tests', function() {
    before(function() {
        request = request.agent(app);
        //userModel.create(Object.values(users));
    });
    describe('Login tests', function() {
        it('should can login with admin account', function(done) {
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
    });

    describe('Logout tests', function() {
        it('should can logout after login', function(done) {
            let options = {
                url: '/auth/logout',
            }
            request
            .post(options.url)
            .expect(200)
            .end(function(err, res) {
                if(err) {
                    throw err;
                }
                done();
            });
        });
        it('should NOT can logout (401 Unauthenticate) without user previous logged', function(done) {
            let options = {
                url: '/auth/logout',
            }
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
    });
});