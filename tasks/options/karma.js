'use strict';

var config = require('../config');

// https://github.com/ChrisWren/grunt-nodemon
module.exports = {
    options: {
        files: config.tests.files
    },
    'unit': {
        configFile: config.tests.config,
        singleRun: true,
        browsers: ['PhantomJS'],
    }
};
