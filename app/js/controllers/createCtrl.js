var createCtrl = function ($scope, $location, $timeout, Projects) {
  $scope.save = function() {
	var start = Date.now();
	$scope.project.start = start;
    Projects.add($scope.project, function() {
      $timeout(function() { $location.path('/user/:userId'); });
    }); 
  }
}
 