(function() {
    'use strict';

    var moduleName = 'app.books.edit',

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

                $stateProvider.state('app.books.edit', {
                    controller: 'BooksEditCtrl',
                    url: '/:bookId/edit',
                    templateUrl: 'books/_books_form.html',
                    resolve: {
                        'book': ['BooksService', '$stateParams',
                            function(BooksService, $stateParams) {
                                return BooksService.get($stateParams.bookId);
                            }
                        ]
                    }
                });
            }
        ]);

        module.controller('BooksEditCtrl', ['$scope', '$state', 'BooksService', 'book',
            function($scope, $state, BooksService, book) {
                console.log('BooksEditCtrl');

                $scope.book = book.data;

                $scope.feedback = {
                    hasFeedback: false,
                    message: null,
                    status: null
                };

                $scope.saveBook = function() {
                    BooksService.update($scope.book).then(
                        function success(response) {
                            $scope.setFeedback(true, 'success', 'Successfully updated book');
                        },
                        function error(response) {
                            $scope.setFeedback(true, 'danger', response);
                        });
                };

                $scope.setFeedback = function(hasFeedback, message, status) {
                    $scope.feedback.hasFeedback = hasFeedback;
                    $scope.feedback.status      = message;
                    $scope.feedback.message     = status;
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
