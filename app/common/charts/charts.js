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

        // module.directive('discreteBarChart', function() {
        //     return {
        //         restrict: 'EA',
        //         scope: {
        //             data: '=',
        //             width: '@',
        //             height: '@',
        //             id: '@',
        //             tooltips: '@',
        //             showxaxis: '@',
        //             showyaxis: '@',
        //             tooltipcontent: '&',
        //             staggerlabels: '@',
        //             color: '&',
        //             margin: '&',
        //             nodata: '@',
        //             x: '&',
        //             y: '&',
        //             //forcex is not exposed in the nvd3 multibar.js file.  it is not here on purpose.
        //             forcey: '@',
        //             showvalues: '@',
        //             valueformat: '&',

        //             callback: '&',

        //             //xaxis
        //             xaxisorient: '&',
        //             xaxisticks: '&',
        //             xaxistickvalues: '&xaxistickvalues',
        //             xaxisticksubdivide: '&',
        //             xaxisticksize: '&',
        //             xaxistickpadding: '&',
        //             xaxistickformat: '&',
        //             xaxislabel: '@',
        //             xaxisscale: '&',
        //             xaxisdomain: '&',
        //             xaxisrange: '&',
        //             xaxisrangeband: '&',
        //             xaxisrangebands: '&',
        //             xaxisshowmaxmin: '@',
        //             xaxishighlightzero: '@',
        //             xaxisrotatelabels: '@',
        //             xaxisrotateylabel: '@',
        //             xaxisstaggerlabels: '@',

        //             //yaxis
        //             yaxisorient: '&',
        //             yaxisticks: '&',
        //             yaxistickvalues: '&yaxistickvalues',
        //             yaxisticksubdivide: '&',
        //             yaxisticksize: '&',
        //             yaxistickpadding: '&',
        //             yaxistickformat: '&',
        //             yaxislabel: '@',
        //             yaxisscale: '&',
        //             yaxisdomain: '&',
        //             yaxisrange: '&',
        //             yaxisrangeband: '&',
        //             yaxisrangebands: '&',
        //             yaxisshowmaxmin: '@',
        //             yaxishighlightzero: '@',
        //             yaxisrotatelabels: '@',
        //             yaxisrotateylabel: '@',
        //             yaxisstaggerlabels: '@',

        //             legendmargin: '&',
        //             legendwidth: '@',
        //             legendheight: '@',
        //             legendkey: '@',
        //             legendcolor: '&',
        //             legendalign: '@',
        //             legendrightalign: '@',
        //             legendupdatestate: '@',
        //             legendradiobuttonmode: '@',

        //             //angularjs specific
        //             objectequality: '@',

        //             //d3.js specific
        //             transitionduration: '@'

        //         },
        //         controller: ['$scope', '$element', '$attrs',
        //             function($scope, $element, $attrs) {
        //                 $scope.d3Call = function(data, chart) {
        //                     checkElementID($scope, $attrs, $element, chart, data);
        //                 };
        //             }
        //         ],
        //         link: function(scope, element, attrs) {
        //             scope.$watch('data', function(data) {
        //                 if (data) {
        //                     //if the chart exists on the scope, do not call addGraph again, update data and call the chart.
        //                     if (scope.chart) {
        //                         return scope.d3Call(data, scope.chart);
        //                     }
        //                     nv.addGraph({
        //                         generate: function() {
        //                             initializeMargin(scope, attrs);
        //                             var chart = nv.models.discreteBarChart()
        //                                 .width(scope.width)
        //                                 .height(scope.height)
        //                                 .margin(scope.margin)
        //                                 .x(attrs.x === undefined ? function(d) {
        //                                     return d[0];
        //                                 } : scope.x())
        //                                 .y(attrs.y === undefined ? function(d) {
        //                                     return d[1];
        //                                 } : scope.y())
        //                                 .forceY(attrs.forcey === undefined ? [0] : scope.$eval(attrs.forcey)) // List of numbers to Force into the Y scale
        //                             .showValues(attrs.showvalues === undefined ? false : (attrs.showvalues === 'true'))
        //                                 .tooltips(attrs.tooltips === undefined ? false : (attrs.tooltips === 'true'))
        //                                 .showXAxis(attrs.showxaxis === undefined ? false : (attrs.showxaxis === 'true'))
        //                                 .showYAxis(attrs.showyaxis === undefined ? false : (attrs.showyaxis === 'true'))
        //                                 .noData(attrs.nodata === undefined ? 'No Data Available.' : scope.nodata)
        //                                 .staggerLabels(attrs.staggerlabels === undefined ? false : (attrs.staggerlabels === 'true'))
        //                                 .color(attrs.color === undefined ? nv.utils.defaultColor() : scope.color());

        //                             configureXaxis(chart, scope, attrs);
        //                             configureYaxis(chart, scope, attrs);
        //                             configureLegend(chart, scope, attrs);

        //                             if (attrs.tooltipcontent) {
        //                                 chart.tooltipContent(scope.tooltipcontent());
        //                             }

        //                             if (attrs.valueformat) {
        //                                 chart.valueFormat(scope.valueformat());
        //                             }

        //                             //events
        //                             //https://github.com/mbostock/d3/wiki/Internals#wiki-dispatch
        //                             //dispatch: 'tooltipShow', 'tooltipHide', 'beforeUpdate',
        //                             //discretebar.dispatch: 'elementMouseout.tooltip', 'elementMouseover.tooltip'

        //                             processEvents(chart, scope);
        //                             scope.d3Call(data, chart);
        //                             nv.utils.windowResize(chart.update);
        //                             scope.chart = chart;
        //                             return chart;
        //                         },
        //                         callback: attrs.callback === undefined ? null : scope.callback()
        //                     });
        //                 }
        //             }, (attrs.objectequality === undefined ? false : (attrs.objectequality === 'true')));
        //         }
        //     };
        // });

        return module;
    });
})();
