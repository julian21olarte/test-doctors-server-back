'use strict';
var UserModel = require('./../models/user.model');
var permissions = require('../routes/permissions');

function isAuthenticate(req, res, next) {
    console.log('user logged middleware: ', req.session.user);
    if(req.session.user) {
        console.log('si hay session');
        next();
    }
    else {
        console.log('hay error');
        res.status(401).send("Unauthenticated.");
    }
}




function isAuthorized(routes) {
    return function(req, res, next) {
        if( req.session.user ) {
            let role = req.session.user.role;
            if(allowPath(role, routes, req)) {
                next();
            }
        }
        res.status(401).send('Unauthorized.');
    }
}




function allowPath(role, routes, req) {
    let allow = permissions.DOCTOR;
    if(role === "ADMIN") {
        return true;
    }
    if( role === "APP" ) {
        allow = permissions.APP;
    }
    if( allow[routes] && allow[routes].includes(req.method) ) {
        if(req.method === "PUT" && req.session.user._id !== req.body.doctor) {
            return false;
        }
        return true;
    }
    return false;
}

module.exports = {
    isAuthenticate,
    isAuthorized
}


