'use strict';

var config = require('../config');

// https://github.com/gruntjs/grunt-contrib-watch
module.exports = {
    'dev': {
        options: {
            interrupt: true,
            spawn: false
        },
        files: config.sass.files,
        tasks: [
            'sass:dev'
        ]
    },
    'server': {
        files: ['.rebooted'],
        options: {
            livereload: true
        }
    }

};
