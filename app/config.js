require.config({
    baseUrl: '.',
    deps: ['angular', 'app'],
    paths: {
        // modules
        'app.common.api': 'common/api',
        'app.common.filters': 'common/filters',
        'app.books': 'books/books',
        'app.stats': 'stats/stats',

        // AngularJS Modules
        'angular': 'bower_components/angular/angular',
        'restangular': 'bower_components/restangular/dist/restangular',
        'ui.bootstrap': 'bower_components/angular-bootstrap/ui-bootstrap-tpls',
        'ui.router': 'bower_components/angular-ui-router/release/angular-ui-router',

        // Utility libraries
        'lodash': 'bower_components/lodash/dist/lodash',
        'moment': 'bower_components/moment/moment',

        // charting libraries
        'd3': 'bower_components/d3/d3',
        'nv': 'bower_components/nvd3/nv.d3'
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'lodash': {
            exports: '_'
        },
        'd3': {
            exports: 'd3'
        },
        'nv': {
            exports: 'nv',
            deps: ['d3']
        },
        'restangular': ['angular', 'lodash'],
        'ui.router': ['angular'],
        'ui.bootstrap': ['angular']
    }
});
