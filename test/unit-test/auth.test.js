'use strict';
const should = require('should');
const request = require('request');
const assert = require('assert');
const _ = require('lodash');
const users = require('../users');
const app = require('../../app');

const userModel = require('../../models/user.model');

describe('Auth login test', function() {

    before(() => {
        // this.timeout(800000000);
        // userModel.create(Object.values(users), function(err, resp) {
        //     if(err) {
        //         return should.not.exist(err);
        //     }
        // });
    });
    describe('test without user logged', () => {
        it('should login with admin account', function(done) {
            this.timeout(80000);
            let options = {
                url: 'http://localhost:3000/auth/login',
                form: users.CREDENTIALS(users.ADMIN)
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

    describe('test with user logged', () => {
        before(() => {
            app.use(function(req, res, next) {
              req.session.user = users.ADMIN;
              next();
            })
        });

        it('should logout after login', (done) => {
            let options = {
                url: 'http://localhost:3000/auth/logout',
            }
            request.post(options, (err, httpResponse, body) => {
                if(err) {
                    return should.not.exist(err);
                }
                //should(httpResponse).has.property('statusCode', 200);
                done();
            });
        });    
    });
});