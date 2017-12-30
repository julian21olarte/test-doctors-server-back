var express = require('express');
var router = express.Router();
var doctor = require('../api/doctor.api');
var auth = require('./../middlewares/auth.middleware');


router.get('/', auth.isAuthorized, doctor.getDoctors);
router.get('/:id', auth.isAuthorized, doctor.getDoctor);
router.post('/save', auth.isAuthorized, doctor.saveDoctor);
router.put('/edit', auth.isAuthorized, doctor.editDoctor);


module.exports = router;