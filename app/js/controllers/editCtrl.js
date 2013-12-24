var editCtrl = function ($scope, $rootScope, $location, $routeParams, angularFire, fbURL) {
  
  if ($rootScope.user) {

    $scope.user = $rootScope.user;

    angularFire(fbURL + $scope.user.id + '/projects/' + $routeParams.projectId, $scope, 'remote', {}).
    then(function() {

      // Saving an old copy for the edit array.
      var oldProject = $scope.remote;
      
      $scope.project = angular.copy($scope.remote);
      $scope.project.$id = $routeParams.projectId;


      $scope.isClean = function() {
        return angular.equals($scope.remote, $scope.project);
      }
      $scope.destroy = function() {
        $scope.remote = null;
        $location.path('/u/' + $scope.user.username);
      };
      $scope.save = function(project) {
        var currentEdit = Date.now();
        if (!$scope.project.edited) {
          $scope.project.edited = {};
        }
        // The key of the edit array is the timestamp of when it was changed.
        $scope.project.edited[currentEdit] = oldProject;
        $scope.remote = angular.copy($scope.project);
        $location.path('/u/' + $scope.user.username);
      };
    });
  }

}
