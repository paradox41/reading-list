(function() {
    'use strict';

    var moduleName = 'app.books.services',

        angularDependencies = [];

    define([
        'angular'
    ], function(angular) {

        var module = angular.module(moduleName, angularDependencies);

        module.factory('BooksService', ['$http',
            function($http) {
                var BooksService = {};

                BooksService.get = function(id) {
                    var pk = id || '';
                    return $http.get('/api/books/'+ pk);
                };

                BooksService.create = function(book) {
                    return $http.post('/api/books/', book);
                };

                BooksService.update = function(book) {
                    return $http.post('/api/books/'+book.book._id, book);
                };

                BooksService.delete = function(id) {
                    return $http.delete('/api/books/'+id);
                };

                return BooksService;
            }
        ]);

        return module;
    });
})();
