'use strict';
const server = require('../bin/www');

after(() => {
    require('../bin/www').stop();
});