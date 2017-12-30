
var UserModel = require('./../models/user.model');

function isAuthorized(req, res, next) {
    let credentials = req.body.credentials;

    let user = UserModel.login(credentials);
    if( user ) {
        if( user.role === "ADMIN" ) {
            next();
        }
    }
    res.status(401).send('Unauthenticate.');
}

module.exports = {
    isAuthorized
}


