var express = require('express');
var router = express.Router();
var auth = require('../api/auth.api');
var authMiddleware = require('../middlewares/auth.middleware');


router.get('/login', auth.login);
router.get('/logout', authMiddleware.isAuthenticate, auth.logout);


module.exports = router;