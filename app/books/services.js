(function() {
    'use strict';

    var moduleName = 'app.books.services',

        dependencies = [
            'angular',
            'restangular'
        ],

        angularDependencies = [
            'restangular'
        ];

    define(dependencies, function(angular) {

        var module = angular.module(moduleName, angularDependencies);

        module.factory('BooksService', function() {
            var BooksService = {};

            BooksService.getBooks = function() {
                console.error('Not implemented yet');
            };

            BooksService.updateBook = function() {
                console.error('Not implemented yet');
            };

            BooksService.deleteBook = function() {
                console.error('Not implemented yet');
            };

            return BooksService;
        });

        return module;
    });
})();

