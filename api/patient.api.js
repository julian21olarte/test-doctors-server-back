'use strict';
var patientService = require('../services/patient.service');


function getPatients(req, res) {
    patientService.getPatients()
    .then( patients => {
        patients.forEach(patient => {
            if( patient.createdBy !== req.session.user._id ) {
                delete patient.createdBy;
            }
        });
        res.status(200).send( {patients} );
    })
    .catch(error => {
        res.status(404).send( {error, message: "No existen pacientes"} );
    });
}



function getPatient(req, res) {
    let patientId = req.params.id;
    patientService.getPatient( patientId )
    .then( patient => {
        if( patient.createdBy !== req.session.user._id ) {
            delete patient.createdBy;
        }
        res.status(200).send({patient: patient, title: 'Detalle de paciente'} );
    })
    .catch(error => {
        res.status(404).send( {error, message: "Paciente no encontrado"} );
    });
}


function getPatientByDocument(req, res) {
    let document = req.params.document;
    patientService.getPatientByDocument( document )
    .then( patient => {
        if( patient.createdBy !== req.session.user._id ) {
            delete patient.createdBy;
        }
        res.status(200).send({patient: patient, title: 'Detalle de paciente'} );
    })
    .catch(error => {
        res.status(404).send( {error, message: "Paciente no encontrado"} );
    });
}



function savePatient(req, res) {
    let patient = req.body.patient;
    patientService.savePatient(patient)
    .then(patientStored => {
        if( patientStored ) {
            res.status(200).send({newPatient: patientStored, message: 'Paciente guardado correctamente.'});
        }
    })
    .catch(error => {
        res.status(404).send( {error, message: "Paciente no fue guardado correctamente"} );
    });
}



function editPatient( req, res ) {
    let patient = req.body.patient;
    let patientId = req.body.patientId;
  
    patientService.editPatient(patientId, patient)
    .then( (patientUpdated) => {
      if(patientUpdated) {
        res.status(200).send({patientUpdated: patientUpdated, message: 'Paciente actualizado correctamente'});
      }
    })
    .catch(error => {
        res.status(404).send( {error, message: "Paciente no fue actualizado correctamente"} );
    });
  }



  function addGlucose(req, res) {
    let patientId = req.body.patientId;
    let glucose = req.body.glucose;
    patientService.addGlucose(patientId, glucose)
    .then( (patientUpdated) => {
        if(patientUpdated) {
            res.status(200).send({patientUpdated: patientUpdated, message: 'Paciente actualizado correctamente'});
        }
    })
    .catch(error => {
        res.status(404).send( {error, message: "Paciente no fue actualizado correctamente"} );
    });
  }


  function getGlucose(req, res) {
      let patientId = req.body.patientId;
      patient.patientService.getPatient(patientId)
      .then(patient => {
        patientService.glucose.forEach(glucose => {
            if( glucose.createdBy !== req.session.user._id ) {
                delete glucose.createdBy;
            }
        });
        res.status(200).send( {glucoseMeditions: patient.glucose} );
      })
      .catch(error => {
        res.status(404).send( {error} );
      });
  }


  
  function editGlucose(req, res) {
      let patientId = req.body.patientId;
      let glucoseId = req.body.glucoseId;
      let glucose   = req.body.glucose;
      patientService.getPatient(patientId)
      .then(patient => {
          //obtengo el paciente
          if(!patient) {
              res.status(404).send({message: 'No existe el paciente'});
          }
          let index = patient.glucose.findIndex(meditionGlucose => {
            return meditionGlucose._id === glucoseId;
          });
          //obtengo la medicion y la modifico
          patient.glucose[index] = glucose;
          patient.markModified('glucose');
          //guardo
          patient.save()
          .then(patientUpdated => {
            if(patientUpdated) {
                res.status(200).send({patient: patientUpdated});
            }
          })
          .catch(error => {
            res.status(404).send( {error, message: "Medicion de glucosa no fue actualizada correctamente"} );
          })
      })
      .catch(error => {
        res.status(404).send( {error, message: "Medicion de glucosa no fue actualizada correctamente"} );
      });
  }


module.exports = {
    getPatient,
    getPatients,
    savePatient,
    editPatient,
    addGlucose,
    getPatientByDocument,
    getGlucose,
    editGlucose
}