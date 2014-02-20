(function() {
    'use strict';

    var moduleName = 'app.api',

        dependencies = [
            'angular'
        ],

        angularDependencies = [];

    define(dependencies, function(angular) {

        var module = angular.module(moduleName, angularDependencies);

        module.factory('books', ['$http',
            function($http) {

                return Book;
            }
        ]);

        return module;
    });
})();
