'use strict';
var doctorService = require('../services/doctor.service');


function getDoctor(req, res) {
    let doctorId = req.params.id;
    if(!doctorId) {
        res.status(404).send('Id del doctor no fue proporcionado');
    }
    doctorService.getDoctor( doctorId )
    .then( doctor => {
        if(doctor) {
            res.status(200).send({doctor: doctor, title: 'Detalle de doctor'} );
        }
        else {
            res.status(404).send( {error, message: 'Doctor no encontrado'} );
        }
    })
    .catch(error => {
        res.status(404).send( {error, message: 'Doctor no encontrado'} );
    })
}



function getDoctors(req, res) {
    doctorService.getDoctors()
    .then( doctors => {
        if(doctors) {
            res.status(200).send( {doctors} );
        }
        else {
            res.status(404).send( {message: 'Doctores no encontrados'} );
        }
    })
    .catch(error => {
        res.status(404).send( {error} );
    })
}


function saveDoctor(req, res) {
    let doctor = req.body.doctor;
    doctorService.saveDoctor(doctor)
    .then(doctorStored => {
        if( doctorStored ) {
            res.status(200).send({newDoctor: doctorStored, message: 'Doctor guardado correctamente.'});
        }
    })
    .catch(error => {
        console.log(error);
        res.status(404).send( {error} );
    })
}



function editDoctor( req, res ) {
    let doctor = req.body.doctor;
    let doctorId = req.body.doctorId;
    doctorService.editDoctor(doctorId, doctor)
    .then( (doctorUpdated) => {
        if(doctorUpdated) {
            res.status(200).send({doctorUpdated: doctorUpdated, message: 'Doctor actualizado correctamente'});
        }
    })
    .catch(error => {
        res.status(404).send({error, message: "No se puedo actualizar el doctor"});
    })
  }


module.exports = {
    getDoctors,
    getDoctor,
    saveDoctor,
    editDoctor
}