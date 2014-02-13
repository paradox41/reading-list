(function() {
    'use strict';

    var moduleName = 'app.books',

        dependencies = [
            'angular',
            'moment',
            'lodash',
            'ui.router',
            'ui.bootstrap',
            'restangular',
            'app.common.filters'
        ],

        angularDependencies = [
            'ui.router',
            'ui.bootstrap',
            'restangular',
            'app.common.filters'
        ];

    define(dependencies, function(angular, moment, _) {

        var module = angular.module(moduleName, angularDependencies);

        module.config(['$stateProvider',
            function($stateProvider) {

                $stateProvider
                    .state('app.books', {
                        controller: 'BooksCtrl',
                        url: '/books',
                        templateUrl: 'books/_books.html',
                        resolve: {
                            'books': ['Restangular',
                                function(Restangular) {
                                    return Restangular.all('books');
                                }
                            ]
                        }
                    })
                    .state('app.books.new', {
                        url: '/new',
                        views: {
                            'main@': {
                                controller: 'BooksFormCtrl',
                                templateUrl: 'books/_books_form.html'
                            }
                        }
                    })
                    .state('app.books.edit', {
                        url: '/:bookId/edit',
                        views: {
                            'main@': {
                                controller: 'BooksFormCtrl',
                                templateUrl: 'books/_books_form.html'
                            }
                        }
                    });
            }
        ]);

        module.controller('BooksCtrl', ['$scope', '$state', 'Restangular', 'books',
            function($scope, $state, Restangular, books) {
                console.log('BooksCtrl', books);

                $scope.reverse = true;

                books.getList().then(function(books) {
                    $scope.books = books;
                });

                $scope.deleteBook = function(bookId) {
                    var index = _.findIndex($scope.books, {
                        '_id': bookId
                    });
                    $scope.books.get(bookId).then(function(response) {
                        response.remove();
                    });
                    $scope.books.splice(index, 1);
                };
            }
        ]);

        module.controller('BooksFormCtrl', ['$scope', '$state', '$stateParams', 'Restangular', 'books',
            function($scope, $state, $stateParams, Restangular, books) {
                console.log('BooksEditCtrl', books);

                if ($stateParams.bookId) {
                    books.get($stateParams.bookId).then(function(book) {
                        $scope.book = book;
                    });
                } else {
                    $scope.book = {
                        title: null,
                        author: null,
                        number_of_pages: null,
                        date_started: null,
                        date_finished: null,
                        created_on: new Date()
                    };
                }

                // $scope.saveBook = function() {
                //     books.post($scope.book).then(function(response) {
                //         $scope.books.push($scope.book);
                //         $scope._clearBook();
                //     });
                // };

                $scope.saveBook = function() {
                    if ($stateParams.bookId) {
                        $scope.book.post().then(function(response) {
                            console.log(response);
                        });
                    } else {
                        books.post($scope.book).then(function(response) {
                            $state.transitionTo('app.books');
                        });
                    }
                };

                // begin datepicker options
                $scope.openedStart = false;
                $scope.openedFinish = false;
                $scope.maxDate = new Date();

                $scope.today = function() {
                    $scope.dt = new Date();
                };

                $scope.today();

                $scope.showWeeks = true;

                $scope.toggleWeeks = function() {
                    $scope.showWeeks = !$scope.showWeeks;
                };

                $scope.clear = function() {
                    $scope.dt = null;
                };

                $scope.openStart = function($event) {
                    $event.preventDefault();
                    $event.stopPropagation();

                    $scope.openedStart = !$scope.openedStart;
                };

                $scope.openFinish = function($event) {
                    $event.preventDefault();
                    $event.stopPropagation();

                    $scope.openedFinish = !$scope.openedFinish;
                };

                $scope.format = 'MMMM-dd-yyyy';
            }
        ]);

        return module;
    });
})();
