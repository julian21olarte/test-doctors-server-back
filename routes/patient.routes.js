var express = require('express');
var router = express.Router();
var patient = require('../api/patient.api');
var auth = require('./../middlewares/auth.middleware');


router.get('/', auth.isAuthorized, patient.getPatients);
router.get('/:id', auth.isAuthorized, patient.getPatient);
router.post('/save', auth.isAuthorized, patient.savePatient);
router.put('/edit', auth.isAuthorized, patient.editPatient);


module.exports = router;