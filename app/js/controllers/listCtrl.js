var listCtrl = function ($scope, $rootScope, $filter, $location, $routeParams, $timeout, angularFire, fbURL) {
  
  $scope.spinner = true;

  $rootScope.$watch('user', function() {
    if ($rootScope.user) {
      
      $scope.user = $rootScope.user;
      
      angularFire(fbURL + $scope.user.id + '/projects/', $scope, 'remote', {}).
        then(function() {

          $scope.spinner = false;

          $scope.todos = angular.copy($scope.remote);

          var orderByImportance = $filter('orderByImportance');

          $scope.focus = function(todo) {
            $scope.focused = todo;
          }    

          $scope.unfocus = function(todo) {
            $scope.focused = '';
          }

          $scope.detailShow = function(){
            if ($scope.focused) {
              return $scope.focused !== '';
            }
          }
          
          $scope.filterSecId = function(items) {
            var result = {};
            angular.forEach(items, function(value, key) {
              if (value.archive != false) {
                result[key] = value;
                result[key].id = key;
              }
            });
            $scope.todos = result;
            return orderByImportance($scope.todos);
          }

          $scope.filterKey = function(items) {
            var result = new Array();
            angular.forEach(items, function(key, value) {
              result.push(value);
            });
            return result;
          }

          $scope.filterTest = function(items) {
            console.log(items);
            return items;
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

          $scope.remaining = function() {
            var count = 0;
            angular.forEach($scope.todos, function(todo) {
              count += todo.done && ! todo.archive ? 0 : 1;
            });
            return count;
          }

          $scope.unarchivedCount = function() {
            var count = 0;
            angular.forEach($scope.todos, function(todo) {
              if (!todo.archive) {
                count += 1;
              };
            })
            return count
          }

          $scope.archive = function() {
            var oldTodos = $scope.todos;
            $scope.todos = {};
            angular.forEach(oldTodos, function(value, key) {
              if (!value.done) {
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
