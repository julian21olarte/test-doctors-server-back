var express = require('express');
var router = express.Router();
var patient = require('../api/patient.api');
var auth = require('./../middlewares/auth.middleware');

router.get('/', auth.isAuthenticate, auth.isAuthorized("PATIENT"), patient.getPatients);
router.get('/:id', auth.isAuthenticate, auth.isAuthorized("PATIENT"), patient.getPatient);
router.get('/byDocument/:document', auth.isAuthenticate, auth.isAuthorized("PATIENT"), patient.getPatientByDocument);
router.post('/save', auth.isAuthenticate, auth.isAuthorized("PATIENT"), patient.savePatient);
router.put('/edit', auth.isAuthenticate, auth.isAuthorized("PATIENT"), patient.editPatient);

router.get('/:id/glucose', auth.isAuthenticate, auth.isAuthorized("GLUCOSE"), patient.getGlucose);
router.post('/glucose', auth.isAuthenticate, auth.isAuthorized("GLUCOSE"), patient.addGlucose);




module.exports = router;