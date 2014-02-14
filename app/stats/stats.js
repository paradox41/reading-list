(function() {
    'use strict';

    var moduleName = 'app.stats',

        dependencies = [
            'angular',
            'd3',
            'nv',
            'lodash',
            'moment',
            'ui.router',
            'restangular',
            'nvd3ChartDirectives'
        ],

        angularDependencies = [
            'ui.router',
            'restangular',
            'nvd3ChartDirectives'
        ];

    define(dependencies, function(angular, d3, nv, _, moment) {

        var module = angular.module(moduleName, angularDependencies);

        module.config(['$stateProvider',
            function($stateProvider) {

                $stateProvider.state('app.stats', {
                    controller: 'StatsCtrl',
                    url: '/stats',
                    templateUrl: 'stats/_stats.html'
                });
            }
        ]);

        module.controller('StatsCtrl', ['$scope', '$state', 'Restangular',
            function($scope, $state, Restangular) {
                console.log('StatsCtrl');

                $scope.currentYear = new Date().getFullYear();

                Restangular.all('books').getList().then(function(books) {
                    $scope.books = books;
                    $scope.pages = $scope._totalPagesRead();
                    $scope.totalBooks = $scope._totalBooks();
                    $scope.pagesReadOverTime = $scope._pagesReadOverTime();
                });

                $scope.dateFormat = function() {
                    return function(d) {
                        // this is broken
                        return d3.time.format('%x')(new Date(d[0]));
                    }
                };

                $scope._getAllFinishedDates = function() {
                    // get all the date_finished
                    return _($scope.books).pluck('date_finished').remove(function(item) {
                        // won't return if the item is undefined
                        return item;
                    }).map(function(date) {
                        // return the unix time
                        return Date.parse(date);
                    }).value().sort(function(a, b) {
                        return new Date(a) - new Date(b);
                    });

                    // return _.map(bookFinished, function(date) {
                    //     // return d3.time.format('%x')(new Date(date));
                    //     return new Date(date).getMonth();
                    // });
                };

                $scope._totalPagesRead = function() {
                    return _($scope.books).pluck('number_of_pages').reduce(function(sum, num) {
                        return sum + num;
                    });
                };

                $scope._totalBooks = function() {
                    return $scope.books.length;
                };

                $scope._pagesReadOverTime = function() {
                    var container = [];
                    var values    = [];
                    var dates     = $scope._getAllFinishedDates();

                    for (var i = 0; i < dates.length; i++) {
                        container.push([dates[i], i]);
                    }

                    // _.forEach($scope.books, function(book) {
                    //     values.push([
                    //         Date.parse(book.date_finished),
                    //         book.number_of_pages
                    //     ]);
                    // });

                    // container.push({
                    //     'key': $scope.currentYear,
                    //     'values': values
                    // });

                    return [{ 'key': '2014', 'values': container }];
                };
            }
        ]);

        return module;
    });
})();
