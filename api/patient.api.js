var patientSchema = require('../models/patient.model');



function getPatients(req, res) {
    console.log('entra a getPatients...');
    patientSchema.find({})
    .then( patients => {
        res.status(200).send( {patients} );
    });
}



function getPatient(req, res) {
    let patientId = req.params.id;
    console.log('entra a getPatient (1 solo)...');
    patientSchema.findById( patientId )
    .then( patient => {
        res.status(200).send({patient: patient, title: 'Detalle de paciente'} );
    });
}


function getPatientByDocument(req, res) {
    let document = req.params.document;
    console.log('entra a getPatient (1 solo)...');
    patientSchema.findById( document )
    .then( patient => {
        res.status(200).send({patient: patient, title: 'Detalle de paciente'} );
    });
}



function savePatient(req, res) {
    let patient = req.body.patient;
    console.log(patient);
    let newPatient = new patientSchema( patient );
    newPatient.save( (err, patientStored) => {
        if(err) {
            throw err;
        }
        else {
            if( patientStored ) {
                res.status(200).send({newPatient: patientStored, message: 'Paciente guardado correctamente.'});
            }
        }
    });
}



function editPatient( req, res ) {
    let patient = req.body.patient;
    let patientId = req.body.patientId;
    console.log(patient);
  
    patientSchema.findByIdAndUpdate(patientId, patient)
    .then( (patientUpdated) => {
      if(patientUpdated) {
        res.status(200).send({patientUpdated: patientUpdated, message: 'Paciente actualizado correctamente'});
      }
    });
  }



  function addGlucose(req, res) {
    let patientId = req.body.patientId;
    let glucose = req.body.glucose;
  
    patientSchema.findByIdAndUpdate(patientId, 
        {$push: {glucose: glucose}},
        {safe: true, upsert: true})
    .then( (patientUpdated) => {
      if(patientUpdated) {
        res.status(200).send({patientUpdated: patientUpdated, message: 'Paciente actualizado correctamente'});
      }
    });
  }


module.exports = {
    getPatient,
    getPatients,
    savePatient,
    editPatient,

}