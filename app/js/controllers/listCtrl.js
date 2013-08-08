 var listCtrl = function ($scope, $location, $routeParams, $timeout, Projects, angularFire, fbURL) {
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
}