var knightCtrl = function ($scope, $filter, $location, $routeParams, $timeout, Projects, angularFire, fbURL) {
  angularFire(fbURL + 'Projects/', $scope, 'remote', {}).
  then(function() {
    $scope.todos = angular.copy($scope.remote);
    var orderByImportance = $filter('orderByImportance');

    $scope.focus = function(todo) {
      $scope.focused = todo;
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


  });
}