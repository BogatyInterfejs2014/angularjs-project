'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/list', {templateUrl: '/partials/list.html', controller: 'ListCtrl'});
  $routeProvider.when('/description/:id', {templateUrl: '/partials/description.html', controller: 'DescriptionCtrl'});
  $routeProvider.otherwise({redirectTo: '/list'});
}]);
