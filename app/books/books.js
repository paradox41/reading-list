(function() {
    'use strict';

    var moduleName = 'app.books',

        dependencies = [
            'angular',
            'moment',
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

    define(dependencies, function(angular, moment) {

        var module = angular.module(moduleName, angularDependencies);

        module.config(['$stateProvider',
            function($stateProvider) {

                $stateProvider
                .state('app.books', {
                    controller: 'BooksCtrl',
                    url: '/books',
                    templateUrl: 'books/_books.html'
                })
                .state('app.books.new', {
                    url: '/new',
                    views: {
                        'main@': {
                            controller: 'BooksCtrl',
                            templateUrl: 'books/_books_form.html'
                        }
                    }
                })
                .state('app.books.edit', {
                    url: '/:bookId/edit',
                    views: {
                        'main@': {
                            controller: 'BooksEditCtrl',
                            templateUrl: 'books/_books_form.html'
                        }
                    }
                });
            }
        ]);

        module.controller('BooksCtrl', ['$scope', '$state', 'Restangular',
            function($scope, $state, Restangular) {
                console.log('BooksCtrl');

                var books = Restangular.all('books');

                books.getList().then(function(books) {
                    $scope.books = books;
                });

                $scope.newBook = {
                    title: null,
                    author: null,
                    number_of_pages: null,
                    date_started: null,
                    date_finished: null,
                    created_on: new Date()
                };

                $scope.addBook = function() {
                    books.post($scope.newBook).then(function(response) {
                        $scope.books.push($scope.newBook);
                        $scope._clearBook();
                    });
                };

                $scope._clearBook = function() {
                    for (var prop in $scope.newBook) {
                        if ($scope.newBook.hasOwnProperty(prop) && prop !== 'created_on') {
                            $scope.newBook[prop] = null;
                        }
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

        module.controller('BooksEditCtrl', ['$scope', '$state', '$stateParams', 'Restangular',
            function($scope, $state, $stateParams, Restangular) {
                console.log('BooksEditCtrl');

                var currentBook = Restangular.one('books', $stateParams.bookId);

                 currentBook.get().then(function(book) {
                    $scope.book = book;
                 });

                $scope.saveBook = function() {
                    currentBook.post();
                };
            }
        ]);

        return module;
    });
})();
