'use strict';

var config = require('../config');

// https://github.com/cri5ti/grunt-shell-spawn
module.exports = {
    'mongo': {
        command: 'mongod',
        options: {
            async: true
        }
    },
    options: {
        stdout: true
    }
};
