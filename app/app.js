(function() {
    'use strict';

    var moduleName = 'app',

        dependencies = [
            'angular',
            'ui.bootstrap',
            'ui.router'
        ],

        angularDependencies = [
            'ui.router',
            'ui.bootstrap'
        ];

    define(dependencies, function(angular) {

        var module = angular.module(moduleName, angularDependencies);

        module.config(['$stateProvider', '$urlRouterProvider',
            function($stateProvider, $urlRouteProvider) {

                $urlRouteProvider.otherwise('/');
            }
        ]);

        angular.bootstrap(document.querySelector('html'), [moduleName]);

        return module;
    });
})();
