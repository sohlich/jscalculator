'use strict';

var baseUrl = 'http://localhost:8080/PlagDetector/rest';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.calculator'
]).
        config(['$routeProvider', function ($routeProvider) {

                $routeProvider.when('/calculator', {
                    templateUrl: 'partials/calculator.html',
                    controller: 'CalculatorController'
                });
                $routeProvider.otherwise({redirectTo: '/calculator'});
            }]);
