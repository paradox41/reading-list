(function() {
    'use strict';

    var moduleName = 'app.books.services',

        dependencies = [
            'angular'
        ],

        angularDependencies = [];

    define(dependencies, function(angular) {

        var module = angular.module(moduleName, angularDependencies);

        module.factory('BooksService', ['$http',
            function($http) {
                var BooksService = {};

                BooksService.getBooks = function() {
                    return $http.get('/api/books');
                };

                BooksService.getBook = function(bookId) {
                    return $http.get('/api/books/'+bookId);
                };

                BooksService.createBook = function(book) {
                    return $http.post('/api/books', book);
                };

                BooksService.updateBook = function(book) {
                    console.log(book);
                    return $http.post('/api/books/'+book.book._id, book);
                };

                BooksService.deleteBook = function(bookId) {
                    return $http.delete('/api/books/'+bookId);
                };

                return BooksService;
            }
        ]);

        return module;
    });
})();
