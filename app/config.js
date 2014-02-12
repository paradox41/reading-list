require.config({
    baseUrl: '.',
    deps: ['angular', 'app'],
    paths: {
        // modules
        'app.api': 'common/api',
        'app.books': 'books/books',
        'app.stats': 'stats/stats',

        // AngularJS Modules
        'angular': 'bower_components/angular/angular',
        'restangular': 'bower_components/restangular/dist/restangular',
        'ui.bootstrap': 'bower_components/angular-bootstrap/ui-bootstrap-tpls',
        'ui.router': 'bower_components/angular-ui-router/release/angular-ui-router',

        // Utility libraries
        'lodash': 'bower_components/lodash/dist/lodash',
        'moment': 'bower_components/moment/moment'
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'restangular': ['angular', 'lodash'],
        'ui.router': ['angular'],
        'ui.bootstrap': ['angular'],
        'lodash': {
            exports: '_'
        }
    }
});
