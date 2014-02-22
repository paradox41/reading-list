'use strict';

var config = require('../config');
var grunt  = require('grunt');

// https://github.com/jsoverson/grunt-plato
module.exports = {
    'report': {
        options: {
            jshint: grunt.file.readJSON('.jshintrc'),
            exclude: /tests\/*/
        },
        files: {
            'plato_report/<%= grunt.template.today("yyyy-mm-dd") %>': config.js.files
        }
    }
};
