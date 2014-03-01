'use strict';

var _ = require('lodash');

// load config for grunt
var loadConfig = function (path) {
    var glob = require('glob');
    var object = {};
    var key;

    glob.sync('*', { cwd: path }).forEach(function (option) {
        key = option.replace(/\.js$/,'');
        object[key] = require(path + option);
    });

    return object;
};

module.exports = function(grunt) {
    // var _ = require('lodash');
    // https://github.com/sindresorhus/time-grunt
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    var config = _.assign({
        pkg: require('./package')
    }, loadConfig('./tasks/options/'));

    grunt.initConfig(config);

    grunt.registerTask('default', [
        'jshint',
        'sass',
        'concurrent:dev'
    ]);

    grunt.registerTask('test', [
        'karma:unit'
    ]);

    grunt.registerTask('reporting', [
        'plato:report'
    ]);

    grunt.registerTask('release', [
        'jshint'
    ]);
};
