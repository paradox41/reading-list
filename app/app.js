(function() {
    'use strict';

    var moduleName = 'app',

        dependencies = [
            'angular',
            'ui.bootstrap',
            'ui.router',
            'restangular',
            'app.books',
            'app.stats'
        ],

        angularDependencies = [
            'ui.router',
            'ui.bootstrap',
            'restangular',
            'app.books',
            'app.stats'
        ];

    define(dependencies, function(angular) {

        var module = angular.module(moduleName, angularDependencies);

        module.config(['$stateProvider', '$urlRouterProvider', 'RestangularProvider',
            function($stateProvider, $urlRouterProvider, RestangularProvider) {

                $urlRouterProvider.otherwise('');
                $urlRouterProvider.when('', '/books');

                $stateProvider.state('app', {
                    url: '',
                    views: {
                        'nav': {
                            templateUrl: 'common/nav/_nav.html'
                        },
                        'main': {
                            template: '<div class="app clearfix" ui-view></div>'
                        }
                    }
                });

                // Restangular settings
                RestangularProvider.setBaseUrl('api/');
                RestangularProvider.setResponseExtractor(function(response, operation) {
                    console.log('Response Extractor', response, operation);
                    return response;
                });
                RestangularProvider.setRestangularFields({
                    // because mongo stores _id
                    id: '_id'
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
