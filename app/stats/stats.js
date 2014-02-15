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
                    $scope.books             = books;
                    $scope.pages             = $scope._totalPagesRead();
                    $scope.totalBooks        = $scope._totalBooks();
                    $scope.pagesReadOverTime = $scope._pagesReadOverTime();
                });

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

                var colorArray = ['#A62A2A', '#FF7474', '#F35656', '#1AA641', '#56F382'];

                $scope.colorFunction = function() {
                    return function(d, i) {
                        return colorArray[i];
                    };
                };

                // will prepare data for the chart
                $scope._pagesReadOverTime = function() {
                    var array = [];

                    var books = _.map(_.sortBy($scope.books, 'date_finished'));

                    _.forEach(books, function(book) {
                        if (book.date_finished && book.number_of_pages) {
                            var year = d3.time.format('%B')(new Date(book.date_finished));
                            var item = _.find(array, { 'key': year });

                            if (!item) {
                                array.push({
                                    'key': year,
                                    'values': [[Date.parse(book.date_finished), book.number_of_pages]]
                                });
                            } else {
                                item.values.push([Date.parse(book.date_finished), book.number_of_pages]);
                            }
                        }
                    });

                    console.log(array);
                    return array;
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
