var editCtrl = function ($scope, $location, $routeParams, angularFire, fbURL) {
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
