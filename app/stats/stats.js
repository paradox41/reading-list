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
            'app.common.charts',
            'app.books.services'
        ],

        angularDependencies = [
            'ui.router',
            'app.common.charts',
            'app.books.services'
        ];

    define(dependencies, function(angular, d3, nv, _, moment) {

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
                                return BooksService.getBooks();
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

                $scope.dateFormat = function() {
                    return function(d) {
                        return d3.time.format('%B')(new Date(d[0]));
                    };
                };

                $scope.removeDecimal = function() {
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

                $scope.banana = function() {
                    var apple = [];
                    var books = _.map(_.sortBy($scope.books, 'date_finished'));

                    _.forEach(books, function(book) {
                        var month = moment(book.date_finished).format('MMMM YYYY');
                        var item  = _.find(apple, { 'key': month });

                        if (book.date_finished && book.number_of_pages) {
                            var dataPoint = [Date.parse(book.date_finished), book.number_of_pages];

                            if (!item) {
                                apple.push({
                                    'key': month,
                                    'values': [dataPoint]
                                });
                            } else {
                                item.values.push(dataPoint);
                            }
                        }
                    });
                    console.log(apple);
                    return apple;
                };
                $scope.chartData = $scope.banana();

                $scope.getPages = function() {
                    return _($scope.books).pluck('number_of_pages').reduce(function(sum, num) {
                        return sum + num;
                    });
                };
                $scope.pages = $scope.getPages();

                $scope.getTotalBooks = function() {
                    return $scope.books.length;
                };
                $scope.totalBooks = $scope.getTotalBooks();

            }
        ]);

        return module;
    });
})();
