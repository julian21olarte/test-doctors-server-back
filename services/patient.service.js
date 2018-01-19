'use strict';
var patientSchema = require('../models/patient.model');



function getPatients() {
    return patientSchema.find({});
}



function getPatient(patientId) {
    return patientSchema.findById( patientId );
}


function getPatientByDocument(document) {
    return patientSchema.find( {document} );
}



function savePatient(patient) {
    let newPatient = new patientSchema( patient );
    return newPatient.save();
}



function editPatient( patientId, patient ) {
    return patientSchema.findByIdAndUpdate(patientId, patient);
  }



  function addGlucose(patientId, glucose) {
    return patientSchema.findByIdAndUpdate(patientId, 
        {$push: {glucose}},
        {safe: true, upsert: true});
  }


module.exports = {
    getPatient,
    getPatients,
    savePatient,
    editPatient,
    addGlucose,
    getPatientByDocument
}