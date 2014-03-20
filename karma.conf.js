// Karma configuration
module.exports = function(config) {
    'use strict';

    config.set({

        // frameworks to use
        frameworks: [
            'requirejs',
            'jasmine'
        ],

        // list of files / patterns to load in the browser
        files: [

            { pattern: 'app/**/*.js', included: false },
            { pattern: 'tests/*Spec.js', included: false },

            // needs to be last http://karma-runner.github.io/0.10/plus/requirejs.html
            'tests/test_main.js'

        ],

        // list of files to exclude
        exclude: [
            'app/config.js'
        ],

        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: [
            'progress'
        ],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_DEBUG,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera (has to be installed with `npm install karma-opera-launcher`)
        // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
        // - PhantomJS
        browsers: [
            'Chrome',
            // 'ChromeCanary',
            // 'Firefox',
            // 'Safari',
            'PhantomJS'
            // 'Opera'
            // 'IE'
        ],

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false,

        plugins: [
            'karma-jasmine',
            'karma-requirejs',
            'karma-chrome-launcher',
            // 'karma-firefox-launcher',
            // 'karma-safari-launcher',
            'karma-phantomjs-launcher'
            // 'karma-opera-launcher'
            // 'karma-ie-launcher'
        ]
    });
};
