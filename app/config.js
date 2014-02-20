require.config({
    baseUrl: '.',
    deps: ['angular', 'app'],
    paths: {
        // common modules
        'app.common.api': 'common/api',
        'app.common.charts': 'common/charts/charts',
        'app.common.filters': 'common/filters',

        // books
        'app.books': 'books/books',
        'app.books.edit': 'books/edit/edit',
        'app.books.new': 'books/new/new',
        'app.books.services': 'books/services',

        // stats
        'app.stats': 'stats/stats',

        // AngularJS Modules
        'angular': 'bower_components/angular/angular',
        'nvd3ChartDirectives': 'bower_components/angularjs-nvd3-directives/dist/angularjs-nvd3-directives',
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
        'nvd3ChartDirectives': ['angular', 'd3', 'nv'],
        'ui.router': ['angular'],
        'ui.bootstrap': ['angular']
    }
});
