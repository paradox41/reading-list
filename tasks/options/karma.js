'use strict';

var config = require('../config');

// https://github.com/karma-runner/grunt-karma
module.exports = {
    'unit': {
        configFile: config.tests.config,
        singleRun: true,
        browsers: ['PhantomJS'],
    }
};
