(function() {
    'use strict';

    var moduleName = 'app.stats',

        dependencies = [
            'angular',
            'd3',
            'nv',
            'lodash',
			'ui.router',
            'restangular',
            'nvd3ChartDirectives'
        ],

        angularDependencies = [
            'ui.router',
            'restangular',
            'nvd3ChartDirectives'
        ];

    define(dependencies, function(angular, d3, nv, _) {

        var module = angular.module(moduleName, angularDependencies);

        module.config(['$stateProvider',
            function($stateProvider) {

                $stateProvider.state('app.stats', {
                    controller: 'StatsCtrl',
                    url: '/stats',
                    templateUrl: 'stats/_stats.html'
                });
            }
        ]);

        module.controller('StatsCtrl', ['$scope', '$state', 'Restangular',
            function($scope, $state, Restangular) {
                console.log('StatsCtrl');

                Restangular.all('books').getList().then(function(books) {
                    $scope.books = books;
                });

                $scope.totalPagesRead = function() {

                };
            }
        ]);

        return module;
    });
})();

