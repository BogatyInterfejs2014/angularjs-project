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
  	//console.log($scope.films);
  	$scope.edit = function(film){
      $scope.formtoggle = true;
      $scope.showedit=false;
      $scope.showsave=false;
      if(film != 'new'){
        $scope.showedit=true;
        $scope.author = "";
        $scope.title = "";
        $scope.link = "";
        $scope.description = "";
        $scope.author = film.author;
        $scope.title = film.title;
        $scope.link = film.link;
        $scope.description = film.description;
      } else{
        $scope.author = "";
        $scope.title = "";
        $scope.link = "";
        $scope.description = "";
        $scope.showsave=true;
      }
    };
    $scope.save = function(){
      var newlink = {"id":$scope.title.slice(0,6), "author":$scope.author,"title":$scope.title,"link":$scope.link,"description":$scope.description};
      //console.log(newlink.author);
      //Films.save({linkid: newlink.id}, newlink);
      Films.create(newlink).success(function(data) {
        $scope.films = data; // assign our new list of todos
      });
      //console.log($scope.films);
      $scope.formtoggle= false;
    };
    $scope.editfilm = function(){
      console.log($scope.author);
      var editlink = {"id":$scope.title.slice(0,6), "author":$scope.author,"title":$scope.title,"link":$scope.link,"description":$scope.description};
      Films.update(editlink).success(function(data) {
        $scope.films = data;
        console.log($scope.films);
      });
      $scope.formtoggle= false;
    };
    $scope.delete = function(id){
      Films.delete(id).success(function(data) {
        $scope.films = data;
        console.log(data);
      });
    };

    
    $scope.filterprop = "film.author";
    console.log($scope.filterprop);
  }])
  .controller('DescriptionCtrl', ['$scope','$routeParams','Films','$sce',function($scope, $routeParams,Films,$sce){
  	
  	var indeks = $routeParams.id;
  	//console.log(indeks);
    Films.getOne(indeks).success(function(data){
      //console.log(data);
      $scope.film = data[0];
      console.log(data[0].link.split('/')[3].slice(8));
      var link = data[0].link.split('/');
      link[3] = data[0].link.split('/')[3].slice(8);
      Array.prototype.insert = function (index, item) {
        this.splice(index, 0, item);
      };
      link.insert(3,'embed');
      link = link.join('/');
      console.log(link);
      $scope.link = $sce.trustAsResourceUrl(link);
      console.log($scope.film);
    });
    //console.log($scope.film);
    $scope.closevideo = function(){
      $('#myModal').on('hidden.bs.modal', function (evt) {
        var player = $(evt.target).find('iframe'),
        vidSrc = player.prop('src');
        player.prop('src', '');
        player.prop('src', vidSrc);
      });
    };
  }]);
