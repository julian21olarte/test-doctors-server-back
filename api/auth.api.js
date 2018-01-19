'use strict';
var authService = require('../services/auth.service');

function login(req, res) {
    let credentials = req.body;
    authService.login(credentials)
    .then(user => {
        if( user ) {
            req.session.user = user;
            res.status(200).send({user, message: 'Login exitoso'});
        }
        else {
            res.status(404).send('Error, No existe ningun usuario con esos datos.');
        }
    })
    .catch(error => {
        res.status(404).send('Error, No existe ningun usuario con esos datos.');
    });
}



function logout(req, res) {
    req.session.destroy();
    res.status(200).send("Logout successfull");
}


module.exports = {
    login, 
    logout
}