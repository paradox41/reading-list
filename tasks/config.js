// grunt config
'use strict';

var pkg = require('../package');

module.exports = {
    banner: '/*! ' + pkg.name + ' - v' + pkg.version + ' - MIT License - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */',

    buildDir: 'build/',

    requirejs: '../app/bower_components/requirejs/require',

    js: {
        files: [
            'Gruntfile.js',
            'app/**/*.js',
            '!**/bower_components/**'
        ],
        jsHintIgnore: [
            '**/bower_components/**'
        ]
    },

    sass: {
        files: [
            'app/common/sass/**/*.scss'
        ],
        src: 'app/app.scss',
        devDest: 'app/app.css',
        map: 'app/app.css.map'
    },

    tests: {
        files: [
            'tests/**/*Spec.js'
        ],
        config: 'karma.conf.js'
    }
};
