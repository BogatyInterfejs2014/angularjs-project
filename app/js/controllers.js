'use strict';

/* Controllers */
//var fs = require('fs');

/*fs.readFile('data/links.json', function (err, data) {
  if (err) throw err;
  console.log(data);
});*/

angular.module('myApp.controllers', [])
  .controller('ListCtrl', ['$scope','Films',function($scope,Films) {
  	$scope.greetings = "Hello";
  	Films.get().success(function(data) {
      $scope.films = data;
    });
  	console.log($scope.films);
  	$scope.edit = function(film){
      $scope.formtoggle = true;
      if(film != 'new'){
        $scope.author = ""
        $scope.title = ""
        $scope.description = "";
        $scope.author = film.channelTitle;
        $scope.title = film.title;
        $scope.description = film.description;
      } else{
        $scope.author = ""
        $scope.title = ""
        $scope.description = "";
        
      }
    };
    $scope.save = function(){
      var newlink = {"id":$scope.title.slice(0,6), "author":$scope.author,"title":$scope.title,"description":$scope.description};
      //Films.save({linkid: newlink.id}, newlink);
      Films.create($scope.newlink).success(function(data) {
            $scope.films = data; // assign our new list of todos
          });
      console.log($scope.films);
      $scope.formtoggle= false;

    };
    
    $scope.filterprop = "film.channelTitle";
  }])
  .controller('DescriptionCtrl', ['$scope','$routeParams','Films',function($scope, $routeParams,Films){
  	
  	var indeks = $routeParams.id;
  	console.log(indeks);
    $scope.film=Films.get({linkid: $routeParams.id});
    console.log($scope.film);

  }]);
