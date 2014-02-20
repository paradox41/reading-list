(function() {
    'use strict';

    var moduleName = 'app.books.new',

        angularDependencies = [
            'ui.router',
			'app.books.services'
        ];

    define([
        'angular',
		'ui.router',
		'app.books.services'
    ], function(angular) {

        var module = angular.module(moduleName, angularDependencies);

        module.config(['$stateProvider',
            function($stateProvider) {

                $stateProvider.state('app.books.new', {
                    url: '/new',
                    views: {
                        'main@': {
                            controller: 'BooksNewCtrl',
                            templateUrl: 'books/_books_form.html'
                        }
                    }
                });
            }
        ]);

        module.controller('BooksNewCtrl', ['$scope', '$state', 'BooksService',
            function($scope, $state, BooksService) {
                console.log('BooksNewCtrl');

                $scope.book = {
                    title: null,
                    author: null,
                    number_of_pages: null,
                    date_started: null,
                    date_finished: null,
                    created_on: new Date()
                };

                $scope.createBook = function() {
                    BooksService.createBook($scope.book).then(function(response) {
                        console.log(response);
                    });
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

                $scope.format = 'MMMM dd, yyyy';
            }
        ]);

        return module;
    });
})();

