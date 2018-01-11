'use strict';
var permissions = {
    
    //ADMIN: TODOS,

    DOCTOR: {

        PATIENT: [
            "GET",
            "POST",
            "PUT"
        ],
        GLUCOSE: [
            "GET",
            "POST",
            "PUT"
        ]
    },

    APP: {
        PATIENT: [
            "GET"
        ],
        GLUCOSE: [
            "GET",
            "POST"
        ]
    }
}

module.exports = permissions;