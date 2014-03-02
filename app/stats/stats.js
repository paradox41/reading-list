(function() {
    'use strict';

    var moduleName = 'app.stats',

        angularDependencies = [
            'ui.router',
            'nvd3ChartDirectives',
            'app.books.services'
        ];

    define([
        'angular',
        'd3',
        'nv',
        'lodash',
        'moment',
        'ui.router',
        'nvd3ChartDirectives',
        'app.books.services'
    ], function(angular, d3, nv, _, moment) {

        var module = angular.module(moduleName, angularDependencies);

        module.config(['$stateProvider',
            function($stateProvider) {

                $stateProvider.state('app.stats', {
                    controller: 'StatsCtrl',
                    url: '/stats',
                    templateUrl: 'stats/_stats.html',
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

        module.controller('StatsCtrl', ['$scope', '$state', 'books',
            function($scope, $state, books) {
                console.log('StatsCtrl');

                $scope.books       = books.data;
                $scope.currentYear = new Date().getFullYear();
                $scope.totalBooks  = $scope.books.length;

                $scope.formatDate = function() {
                    return function(d) {
                        return d3.time.format('%B')(new Date(d));
                    };
                };

                $scope.round = function() {
                    return function(d) {
                        return d3.round(d);
                    };
                };

                var colorArray = ['#002635', '#013440', '#AB1A25', '#D97925', '#EFE7BE'];

                $scope.colorFunction = function() {
                    return function(d, i) {
                        return colorArray[i % colorArray.length];
                    };
                };

                function getChartData() {
                    var array = [];
                    var books = _.filter(_.map(_.sortBy($scope.books, 'date_finished')), function(book) {
                        return book.date_finished;
                    });

                    _.forEach(books, function(book) {
                        var year = moment(book.date_finished).format('YYYY');
                        var key = _.find(array, {
                            'key': year
                        });
                        var value = [Date.parse(book.date_finished), book.number_of_pages];

                        if (!key) {
                            array.push({
                                'key': year,
                                'values': [value]
                            });
                        } else {
                            key.values.push(value);
                        }
                    });

                    return array;
                }

                $scope.chartData = getChartData();

                $scope.banana = function() {
                    var books = _.groupBy(_.filter(_.map(_.sortBy($scope.books, 'date_finished')), function(book) {
                        return book.date_finished;
                    }), function(book) {
                        return moment(book.date_finished).format('MMMM YYYY');
                    });
                };

                function getPages() {
                    return _($scope.books).pluck('number_of_pages').reduce(function(sum, num) {
                        return sum + num;
                    });
                }
                $scope.pages = getPages();

            }
        ]);

        return module;
    });
})();
