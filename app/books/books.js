(function() {
    'use strict';

    var moduleName = 'app.books',

        dependencies = [
            'angular',
            'ui.router'
        ],

        angularDependencies = [
            'ui.router'
        ];

    define(dependencies, function(angular) {

        var module = angular.module(moduleName, angularDependencies);

        module.config(['$stateProvider',
            function($stateProvider) {

                $stateProvider.state('app.books', {
                    url: '/books',
                    controller: 'BooksCtrl',
                    templateUrl: 'books/_books.html'
                });
            }
        ]);

        module.controller('BooksCtrl', ['$scope', '$state',
            function($scope, $state) {
                console.log('BooksCtrl');
            }
        ]);

        return module;
    });
})();
