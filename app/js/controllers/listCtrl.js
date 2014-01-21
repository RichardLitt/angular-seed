var listCtrl = function ($scope, $rootScope, $filter, $location, $routeParams, $timeout, angularFire, fbURL) {
  
  $scope.spinner = true;

  $rootScope.$watch('user', function() {
    if ($rootScope.user) {
      
      $scope.user = $rootScope.user;
      
      angularFire(fbURL + $scope.user.id + '/projects/', $scope, 'remote', {}).
        then(function() {

          $scope.showProject = true;

          $scope.spinner = false;

          $scope.todos = angular.copy($scope.remote);

          $scope.focus = function(todo) {
            if ($scope.focused && $scope.focused == todo) {
              $scope.focused = null
            } else if ($scope.focused) {
              $scope.focused = todo 
            } else {
              $scope.focused = todo
            }
          }     

          $scope.hide = function(todo) {
            todo.hide = !todo.hide;
            $scope.remote = angular.copy($scope.todos);
          }

          $scope.unhideAll = function(todos) {
            angular.forEach(todos, function(value, key) {
              value.hide = null;
            })
            $scope.remote = angular.copy($scope.todos);
            return todos;
          }
          
          // These two functions can't be right...
          
          $scope.filterSecId = function(items) {
            var result = {};
            angular.forEach(items, function(value, key) {
              if (value.archive != false) {
                result[key] = value;
                result[key].id = key;
              }
            });
            return result;
          }

          $scope.filterKey = function(items) {
            var result = new Array();
            angular.forEach(items, function(key, value) {
              result.push(value);
            });
            return result;
          }

          $scope.saveChange = function(todo){
            var d = new Date()
            todo.end = d;
            angular.equals($scope.remote, $scope.todos);      
            $scope.remote = angular.copy($scope.todos);
          }

          $scope.addTodo = function() {
            var d = new Date();
            Projects.add({text:$scope.todoText, done:false, date:d}, function() {
              $timeout(function() { $location.path('/'); });
            });
            $scope.todoText = '';
          }

          $scope.tasksCount = function() {
            var count = {
              'allCurrentTasks': 0,
              'leftToDo': 0
            }
            angular.forEach($scope.todos, function(todo) {
              if (!todo.archived) {
                count.allCurrentTasks += 1;
                if (!todo.done) {
                    count.leftToDo += 1;
                }
              }
            })
            return count
          }

          $scope.archive = function() {
            var oldTodos = $scope.todos;
            $scope.todos = {};
            angular.forEach(oldTodos, function(value, key) {
              value.hide = null;
              if (!value["done"]) {
                $scope.todos[key] = value;
              } else {
                value["archived"] = true;
                $scope.todos[key] = value;
              }
            }, $scope.todos);
            $scope.remote = angular.copy($scope.todos);
          };

          $scope.endTodo = function($scope, $location, $routeParams, angularFire, fbURL) {
            angularFire(fbURL + $routeParams, $scope, 'remote', {}).
            then(function() {
              $scope.todo = angular.copy($scope.remote);
              $scope.todo.done == true;
              Projects.push($scope);
            });
          };
        }
      );
    }
  })
}
