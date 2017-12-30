var doctorSchema = require('../models/doctor.model');


function getDoctor(req, res) {
    let doctorId = req.params.id;
    console.log('entra a getDoctor...');
    doctorSchema.findById( doctorId )
    .then( doctor => {
        res.status(200).send({doctor: doctor, title: 'Detalle de doctor'} );
    });
}


function getDoctors(req, res) {
    console.log('entra a getDoctors...');
    doctorSchema.find({})
    .then( doctors => {
        res.status(200).send( {doctors} );
    });
}


function saveDoctor(req, res) {
    let doctor = req.body.doctor;
    console.log(doctor);
    let newDoctor = new doctorSchema( doctor );
    newDoctor.save( (err, doctorStored) => {
        if(err) {
            throw err;
        }
        else {
            if( doctorStored ) {
                res.status(200).send({newDoctor: doctorStored, message: 'Doctor guardado correctamente.'});
            }
        }
    });
}



function editDoctor( req, res ) {
    let doctor = req.body.doctor;
    let doctorId = req.body.doctorId;
    console.log(doctor);
  
    doctorSchema.findByIdAndUpdate(doctorId, doctor)
    .then( (doctorUpdated) => {
      if(doctorUpdated) {
        res.status(200).send({doctorUpdated: doctorUpdated, message: 'Doctor actualizado correctamente'});
      }
    });
  }


module.exports = {
    getDoctors,
    getDoctor,
    saveDoctor,
    editDoctor
}