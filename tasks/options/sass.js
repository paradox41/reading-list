'use strict';

var config = require('../config');

var helper = {};

helper.sassDev = {};
helper.sassDev[config.sass.devDest] = config.sass.src;

// https://github.com/sindresorhus/grunt-sass
module.exports = {
    'dev': {
        options: {
            outputStyle: 'expanded',
            sourceComments: 'map',
            sourceMap: config.sass.map
        },
        files: helper.sassDev
    }

};
