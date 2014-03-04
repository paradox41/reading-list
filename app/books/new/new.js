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
                    controller: 'BooksNewCtrl',
                    url: '/new',
                    templateUrl: 'books/_books_form.html'
                });
            }
        ]);

        module.controller('BooksNewCtrl', ['$scope', '$state', 'BooksService',
            function($scope, $state, BooksService) {
                console.log('BooksNewCtrl');

                $scope.feedback = {
                    hasFeedback: false,
                    message: null,
                    status: null
                };

                $scope.book = {
                    title: null,
                    author: null,
                    number_of_pages: null,
                    date_started: new Date(),
                    date_finished: null,
                    created_on: new Date()
                };

                $scope.saveBook = function() {
                    BooksService.create($scope.book).then(
                        function success(response) {
                            $scope.setFeedback(true, 'success', 'Successfully added book');
                        },
                        function error(response) {
                            $scope.setFeedback(true, 'danger', response);
                        }
                    );
                };

                $scope.setFeedback = function(hasFeedback, status, message) {
                    $scope.feedback.hasFeedback = hasFeedback;
                    $scope.feedback.status      = status;
                    $scope.feedback.message     = message;
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

