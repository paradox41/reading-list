(function() {
    'use strict';

    var moduleName = 'app.common.charts',

        dependencies = [
            'angular',
            'd3',
            'nv'
        ],

        angularDependencies = [];

    define(dependencies, function(angular, d3, nv) {

        var module = angular.module(moduleName, angularDependencies);

        module.directive('discreteBarChart', function() {
            return {
                restrict: 'EA',
                scope: {
                    data: '=',
                    width: '@',
                    height: '@',
                    id: '@',
                    tooltips: '@',
                    showxaxis: '@',
                    showyaxis: '@',
                    tooltipcontent: '&',
                    staggerlabels: '@',
                    color: '&',
                    margin: '&',
                    nodata: '@',
                    x: '&',
                    y: '&',
                    showvalues: '@',
                    valueformat: '&'
                },
                controller: ['$scope', '$element', '$attrs',
                    function($scope, $element, $attrs) {
                        $scope.d3Call = function(data, chart) {
                            checkElementID($scope, $attrs, $element, chart, data);
                        };
                    }
                ],
                link: function(scope, element, attrs) {
                    nv.addGraph(function() {
                        var chart = nv.models.discreteBarChart()
                            .x(function(d) {
                                return d.label
                            })
                            .y(function(d) {
                                return d.value
                            })
                            .staggerLabels(true)
                        .tooltips(false)
                            .showValues(true)
                            .transitionDuration(250);

                        d3.select('#chart1 svg')
                            .datum(historicalBarChart)
                            .call(chart);

                        nv.utils.windowResize(chart.update);

                        return chart;
                    });
                }
            };
        });

        return module;
    });
})();
