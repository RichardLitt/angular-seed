var login = function($scope, $rootScope, $location) {
	console.log('Working.');

	$scope.gitLogin = function ($scope, $location, $rootScope, $routeParams) {
		var chatRef = new Firebase('https://lean.firebaseio.com');
		var auth = new FirebaseSimpleLogin(chatRef, function(error, user) {
		  if (error) {
		    // an error occurred while attempting login
		    console.log(error);
		  } else if (user) {
		    // user authenticated with Firebase
		    console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
		  } else {
		    // user is logged out
			console.log('Logged out.');
		    $rootScope.user = {
		    	id: false
		    };
		  }
		});
		auth.login('github')
	};

};

