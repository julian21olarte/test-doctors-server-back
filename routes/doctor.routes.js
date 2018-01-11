'use strict';
var express = require('express');
var router = express.Router();
var doctor = require('../api/doctor.api');
var auth = require('./../middlewares/auth.middleware');


router.get('/', auth.isAuthenticate, auth.isAuthorized("DOCTOR"), doctor.getDoctors);
router.get('/:id', auth.isAuthenticate, auth.isAuthorized("DOCTOR"), doctor.getDoctor);
router.post('/save', auth.isAuthenticate, auth.isAuthorized("DOCTOR"), doctor.saveDoctor);
router.put('/edit', auth.isAuthenticate, auth.isAuthorized("DOCTOR"), doctor.editDoctor);


module.exports = router;