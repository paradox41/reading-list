(function() {
    'use strict';

    var moduleName = 'app.stats',

        dependencies = [
            'angular',
            'd3',
            'nv',
			'ui.router'
        ],

        angularDependencies = [
            'ui.router'
        ];

    define(dependencies, function(angular, d3, nv) {

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

        module.controller('StatsCtrl', ['$scope', '$state',
            function($scope, $state) {
                console.log('StatsCtrl');
            }
        ]);

        return module;
    });
})();

