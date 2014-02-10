(function() {
    'use strict';

    var moduleName = 'app.api',

        dependencies = [
            'angular',
            'ngResource'
        ],

        angularDependencies = [
            'ngResource'
        ];

    define(dependencies, function(angular) {

        var module = angular.module(moduleName, angularDependencies);

        module.factory('books', ['$http', '$resource',
            function($http, $resource) {
                var Book = $resource('/api/books');

                return Book;
            }
        ]);

        return module;
    });
})();
