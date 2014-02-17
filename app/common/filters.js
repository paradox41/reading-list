(function() {
    'use strict';

    var moduleName = 'app.common.filters',

        dependencies = [
            'angular',
            'moment',
            'd3'
        ],

        angularDependencies = [];

    define(dependencies, function(angular, moment, d3) {

        var module = angular.module(moduleName, angularDependencies);

        module.filter('default', function() {
            return function(value, defaultValue) {
                // if the value is invalid, return the default value
                if (value === undefined || value === null) {
                    return defaultValue;
                }
                return value;
            };
        });

        module.filter('round', function() {
            return function(value, roundTo) {
                roundTo = roundTo || 0;
                if (isNaN(value)) {
                    return '-';
                }
                return d3.round(value, roundTo);
            };
        });

        // returns something like, 10 minutes ago, 1 year ago, etc
        module.filter('humanizeTime', function() {
            return function(value) {
                if (value === undefined || value === null) {
                    return '-';
                }
                return moment(new Date(value)).from(new Date());
            };
        });

        return module;
    });
})();
