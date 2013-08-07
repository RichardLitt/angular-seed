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
      when('/', {controller:ListCtrl, templateUrl:'list.html'}).
      when('/edit/:projectId', {controller:EditCtrl, templateUrl:'detail.html'}).
      when('/new', {controller:CreateCtrl, templateUrl:'detail.html'}).
      otherwise({redirectTo:'/'});
  });

 
function CreateCtrl($scope, $location, $timeout, Projects) {
  $scope.save = function() {
    Projects.add($scope.project, function() {
      $timeout(function() { $location.path('/'); });
    });
  }
}
 
function EditCtrl($scope, $location, $routeParams, angularFire, fbURL) {
  angularFire(fbURL + 'Projects/' + $routeParams.projectId, $scope, 'remote', {}).
  then(function() {
    $scope.project = angular.copy($scope.remote);
    $scope.project.$id = $routeParams.projectId;
    $scope.isClean = function() {
      return angular.equals($scope.remote, $scope.project);
    }
    $scope.destroy = function() {
      $scope.remote = null;
      $location.path('/');
    };
    $scope.save = function() {
      $scope.remote = angular.copy($scope.project);
      $location.path('/');
    };
  });
}

 function ListCtrl($scope, $location, $routeParams, $timeout, Projects, angularFire, fbURL) {
  angularFire(fbURL + 'Projects/', $scope, 'remote', {}).
  then(function() {
    $scope.todos = angular.copy($scope.remote);

    $scope.filterSecId = function(items) {
      console.log(items);
      var result = {};
      angular.forEach(items, function(value, key) {
        result[key] = value;
      });
      console.log(result);
      return result;
    }

    $scope.filterTest = function(items) {
      console.log(items);
      return items;
    }

    $scope.saveChange = function(todo){
      angular.equals($scope.remote, $scope.project);      
      $scope.remote = angular.copy($scope.todos);
    }

    $scope.addTodo = function() {
      var d = new Date();
      Projects.add({text:$scope.todoText, done:false, date:d}, function() {
        $timeout(function() { $location.path('/'); });
      });
      $scope.todoText = '';
    }

    $scope.remaining = function() {
      var count = 0;
      angular.forEach($scope.todos, function(todo) {
        count += todo.done ? 0 : 1;
      });
      return count;
    }

    $scope.endTodo = function($scope, $location, $routeParams, angularFire, fbURL) {
    angularFire(fbURL + $routeParams, $scope, 'remote', {}).
    then(function() {
      console.log($scope, 'hello');
      $scope.todo = angular.copy($scope.remote);
      $scope.todo.done == true;
      Projects.push($scope);
      /* $scope.project = angular.copy($scope.remote);
      $scope.project.$id = $routeParams.projectId;
      $scope.remote.done = angular.copy($scope.todo); */
      // $scope.project.push($scope.project.todo);
      // $scope.project.push(todo.done);
    });
      /*$scope.todo = angular.copy($scope.remote);
      $scope.save = function() {
        return angular.equals($scope.remote, $scope.todo);
      }*/
    };

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
}