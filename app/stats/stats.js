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
            'nvd3ChartDirectives'
        ],

        angularDependencies = [
            'ui.router',
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

        module.controller('StatsCtrl', ['$scope', '$state',
            function($scope, $state) {
                console.log('StatsCtrl');

                $scope.currentYear = new Date().getFullYear();

                // Restangular.all('books').getList().then(function(books) {
                //     $scope.books      = books;
                //     $scope.pages      = $scope._totalPagesRead();
                //     $scope.totalBooks = $scope._totalBooks();
                //     $scope.chartData  = $scope.banana();
                // });

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

                $scope._totalPagesRead = function() {
                    return _($scope.books).pluck('number_of_pages').reduce(function(sum, num) {
                        return sum + num;
                    });
                };

                $scope._totalBooks = function() {
                    return $scope.books.length;
                };
            }
        ]);

        return module;
    });
})();
