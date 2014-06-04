'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var app = angular.module('myApp.services', ['ngResource']);
app.factory('Films', ['$resource','$http', function($resource,$http) {
	/*return $resource('/api/:site/:id', {}, {
      'query': {method:'GET',params:{site:'list',},isArray:true},
    });*/
	return {
			get : function() {
				return $http.get('/api/list');
			},
			getOne : function(id) {
				//console.log(id);
				return $http.get('/api/list/'+id);
			},
			create : function(linkdata) {
				return $http.post('/api/list', linkdata);
			},
			delete : function(id) {
				return $http.delete('/api/list/' + id);
			}
		}
}]);