/* global window: true */
var tests = [];

for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/Spec\.js$/.test(file)) {
            tests.push(file);
        }
    }
}

// require([
//     '../app/config.js'
// ], function(config) {
//     require.config({
//         baseUrl: '/base/app',
//
//         // ask Require.js to load these files (all our tests)
//         deps: tests,
//
//         // start test run, once Require.js is done
//         callback: window.__karma__.start
//     });
// });

requirejs.config({
    baseUrl: '/base/app',
    paths: {

        // AngularJS Modules
        'angular': 'bower_components/angular/angular',
        'angular.mock': 'bower_components/angular-mocks/angular-mocks',

        // Utility libraries
        'lodash': 'bower_components/lodash/dist/lodash',
        'moment': 'bower_components/moment/moment',
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'angular.mock': {
            deps: ['angular'],
            exports: 'angular.mock'
        },
        'lodash': {
            exports: '_'
        }
    },
    deps: tests,
    callback: window.__karma__.start
});
