var createCtrl = function ($scope, $location, $rootScope, $timeout, angularFireCollection, fbURL) {
	
	if ($rootScope.user) {
      fbURL = fbURL + $rootScope.user.id + '/projects/';
	  
	  $scope.save = function() {
		var start = Date.now();
		$scope.project.start = start;
	    angularFireCollection(fbURL).add($scope.project); 
	    $location.path('/u/' + $rootScope.user.username);
	  }
    } 
    
}
 