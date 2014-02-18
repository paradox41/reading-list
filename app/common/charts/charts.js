(function() {
    'use strict';

    var moduleName = 'app.common.charts',

        dependencies = [
            'angular',
            'd3',
            'nv'
        ],

        angularDependencies = [];

    define(dependencies, function(angular, d3, nv) {

        var module = angular.module(moduleName, angularDependencies);

        module.directive('chart', function() {
            return {
                restrict: 'EA',
                scope: {
                    data: '='
                },
                link: function(scope, element, attrs) {

                }
            };
        });

        return module;
    });
})();

