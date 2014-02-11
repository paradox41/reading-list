(function() {
    'use strict';

    var moduleName = 'app.books',

        dependencies = [
            'angular',
            'ui.router',
            'ui.bootstrap',
            'ngResource'
        ],

        angularDependencies = [
            'ui.router',
            'ui.bootstrap',
            'ngResource'
        ];

    define(dependencies, function(angular) {

        var module = angular.module(moduleName, angularDependencies);

        module.config(['$stateProvider',
            function($stateProvider) {

                $stateProvider.state('app.books', {
                    controller: 'BooksCtrl',
                    url: '/books',
                    templateUrl: 'books/_books.html'
                });
            }
        ]);

        module.controller('BooksCtrl', ['$scope', '$state', '$http', '$resource',
            function($scope, $state, $http, $resource) {
                console.log('BooksCtrl');

                var Book = $resource('/api/books', {}, {
                    'save': {
                        method: 'POST',
                        isArray: true
                    }
                });

                var books = Book.query(function() {
                    $scope.books = books;
                    console.log('All books: ', $scope.books);
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
                    var newBook = new Book($scope.newBook);

                    newBook.$save(function(response) {
                        console.log(response);
                    });

                    // $scope.books.push($scope.newBook);
                    $scope._clearBook();
                };

                $scope._clearBook = function() {
                    for (var prop in $scope.newBook) {
                        if ($scope.newBook.hasOwnProperty(prop) && prop !== 'created_on') {
                            $scope.newBook[prop] = null;
                        }
                    }
                };

                // begin datepicker options
                $scope.openedStart  = false;
                $scope.openedFinish = false;

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
