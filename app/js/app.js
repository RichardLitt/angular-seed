'use strict';


// Declare app level module which depends on filters, and services
angular.module('lean', ['firebase']).
  value('fbURL', 'https://lean.firebaseio.com/').
  factory('Projects', function(angularFireCollection, fbURL) {
    fbURL = fbURL + 'Projects/';
    return angularFireCollection(fbURL);
  }).
  config(function($routeProvider) {
    $routeProvider.
      when('/', {controller:listCtrl, templateUrl:'list.html'}).
      when('/edit/:projectId', {controller:editCtrl, templateUrl:'detail.html'}).
      when('/new', {controller:createCtrl, templateUrl:'detail.html'}).
      otherwise({redirectTo:'/'});
  });

 
  /* 
  Need to find a way to add archive:true to projects, using EditCtrl syntax. 
  As well, need to find a way to delete tasks for good. 

  $scope.archive = function() {
    var oldTodos = $scope.todos;
    $scope.todos = [];
    angular.forEach(oldTodos, function(todo) {
      if (!todo.done) $scope.todos.push(todo);
      if (todo.done) $scope.
    });
  }; */