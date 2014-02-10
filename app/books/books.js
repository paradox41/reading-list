(function() {
    'use strict';

    var moduleName = 'app.books',

        dependencies = [
            'angular',
            'ui.router',
            'ui.bootstrap',
            'ngResource'
            // 'app.api'
        ],

        angularDependencies = [
            'ui.router',
            'ui.bootstrap',
            'ngResource'
            // 'app.api'
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

                var Books = $resource('/api/books');

                $scope.books = Books.query();

                debugger;

                $scope.today = function() {
                    $scope.dt = new Date();
                }
                $scope.today();

                $scope.showWeeks = true;
                $scope.toggleWeeks = function() {
                    $scope.showWeeks = !$scope.showWeeks;
                };

                $scope.clear = function() {
                    $scope.dt = null;
                };

                // Disable weekend selection
                $scope.disabled = function(date, mode) {
                    return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
                };

                $scope.toggleMin = function() {
                    $scope.minDate = ($scope.minDate) ? null : new Date();
                };
                $scope.toggleMin();

                $scope.open = function($event) {
                    $event.preventDefault();
                    $event.stopPropagation();

                    $scope.opened = true;
                };

                $scope.dateOptions = {
                    'year-format': "'yy'",
                    'starting-day': 1
                };

                $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate'];
                $scope.format = $scope.formats[0];
            }
        ]);

        return module;
    });
})();
