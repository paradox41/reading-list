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
        'ngResource': 'bower_components/angular-resource/angular-resource',
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
        'ngResource': ['angular'],
        'ui.router': ['angular'],
        'ui.bootstrap': ['angular'],
        'lodash': {
            exports: '_'
        }
    }
});
