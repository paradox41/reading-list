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
                    debugger;
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

                // will prepare data for the chart
                $scope._getAllFinishedDates = function() {
                    var array = [];

                    var books = _.filter($scope.books, function(book) {
                        return book.date_finished && book.number_of_pages;
                    });

                    var pages = _.map(books, function(book) {
                        return book.number_of_pages;
                    });

                    var dates = _.map(books, function(book) {
                        return Date.parse(book.date_finished);
                    });

                    var years = _(dates).groupBy(function(date) {
                        return new Date(date).getFullYear();
                    }).keys().forEach(function(key) {
                        array.push({
                            "key": key,
                            "values": []
                        });
                    });

                    console.log(array);
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
