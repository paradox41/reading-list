(function() {
    'use strict';

    var moduleName = 'app',

        angularDependencies = [
            'ui.router',
            'ui.bootstrap',
            'app.books',
            'app.stats'
        ];

    define([
        'angular',
        'ui.bootstrap',
        'ui.router',
        'app.books',
        'app.stats'
    ], function(angular) {

        var module = angular.module(moduleName, angularDependencies);

        module.config(['$stateProvider', '$urlRouterProvider',
            function($stateProvider, $urlRouterProvider) {

                $urlRouterProvider.otherwise('');
                $urlRouterProvider.when('', '/books');

                $stateProvider.state('app', {
                    url: '',
                    views: {
                        'nav': {
                            templateUrl: 'common/nav/_nav.html'
                        },
                        'main': {
                            templateUrl: 'common/main/_main.html'
                        }
                    }
                });
            }
        ]);

        module.controller('appCtrl', ['$scope', '$state',
            function($scope, $state) {
                console.log('appCtrl');
            }
        ]);

        module.run(['$rootScope', '$state', '$stateParams',
            function($rootScope, $state, $stateParams) {
                $rootScope.$state       = $state;
                $rootScope.$stateParams = $stateParams;

                $rootScope.$on('$routeChangeError', function() {
                    console.log('failed to change routes', arguments);
                });
            }
        ]);

        angular.bootstrap(document.querySelector('html'), [moduleName]);

        return module;
    });
})();
