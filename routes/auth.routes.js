'use strict';
var express = require('express');
var router = express.Router();
var auth = require('../api/auth.api');
var authMiddleware = require('../middlewares/auth.middleware');


router.post('/login', auth.login);
router.post('/logout', authMiddleware.isAuthenticate, auth.logout);


module.exports = router;