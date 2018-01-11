var doctorService = require('../services/doctor.service');


function getDoctor(req, res) {
    let doctorId = req.params.id;
    console.log('entra a getDoctor...');
    doctorService.getDoctor( doctorId )
    .then( doctor => {
        res.status(200).send({doctor: doctor, title: 'Detalle de doctor'} );
    })
    .catch(error => {
        res.status(404).send( {error, message: 'Doctor no encontrado'} );
    })
}



function getDoctors(req, res) {
    console.log('entra a getDoctors...');
    doctorService.getDoctors()
    .then( doctors => {
        res.status(200).send( {doctors} );
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