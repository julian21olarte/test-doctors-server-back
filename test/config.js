'use strict';
const server = require('../app');

after(() => {
    require('../app').stop();
});