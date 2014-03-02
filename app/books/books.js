(function() {
    'use strict';

    var moduleName = 'app.books',

        angularDependencies = [
            'ui.router',
            'ui.bootstrap',
            'app.books.edit',
            'app.books.new',
            'app.common.filters',
            'app.books.services'
        ];

    define([
        'angular',
        'moment',
        'lodash',
        'ui.router',
        'ui.bootstrap',
        'app.books.edit',
        'app.books.new',
        'app.common.filters',
        'app.books.services'
    ], function(angular, moment, _) {

        var module = angular.module(moduleName, angularDependencies);

        module.config(['$stateProvider',
            function($stateProvider) {

                $stateProvider
                .state('app.books', {
                    controller: 'BooksCtrl',
                    url: '/books',
                    templateUrl: 'books/_books.html',
                    resolve: {
                        'books': ['BooksService',
                            function(BooksService) {
                                return BooksService.get();
                            }
                        ]
                    }
                });
            }
        ]);

        module.controller('BooksCtrl', ['$scope', '$state', 'BooksService', 'books',
            function($scope, $state, BooksService, books) {
                console.log('BooksCtrl', books);

                $scope.reverse = true;
                $scope.books   = books.data;

                $scope.titles = _.pluck($scope.books, 'title');

                $scope.deleteBook = function(bookId) {
                    console.log('clicked');
                    var index = _.findIndex($scope.books, {
                        '_id': bookId
                    });

                    BooksService.deleteBook(bookId).then(function(response) {
                        console.log(response);
                        $scope.books.splice(index, 1);
                    });
                };
            }
        ]);

        return module;
    });
})();
