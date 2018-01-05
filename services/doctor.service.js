var doctorSchema = require('../models/doctor.model');


function getDoctor(doctorId) {
    return doctorSchema.findById( doctorId );
}


function getDoctors() {
    return doctorSchema.find({});
}


function saveDoctor(doctor) {
    let newDoctor = new doctorSchema( doctor );
    return newDoctor.save();
}



function editDoctor( doctorId, doctor ) {
    return doctorSchema.findByIdAndUpdate(doctorId, doctor)
  }


module.exports = {
    getDoctors,
    getDoctor,
    saveDoctor,
    editDoctor
}