'use strict';
function login(req, res) {
    let credentials = req.authUserCredentials;
    let user = UserModel.login(credentials);
    if( user ) {
        req.user = user;
        res.status(200).send("Login Exitoso");
    }
    res.status(401).send('Error, No existe ningun usuario con esos datos.');
}



function logout(req, res) {
    delete request.user;
    res.status(200).send("Logout!!!");
}


module.exports = {
    login, 
    logout
}