'use strict';

var config = require('../config');

// https://github.com/gruntjs/grunt-contrib-jshint
module.exports = {
    options: {
        jshintrc: '.jshintrc',
        ignores: config.js.jsHintIgnore,
        reporter: require('jshint-stylish')
    },
    all: config.js.files
};
