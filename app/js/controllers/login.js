var login = function($scope) {
	console.log('Working.');

	$scope.gitLogin = function ($scope, $location, $routeParams) {
		var chatRef = new Firebase('https://lean.firebaseio.com');
		var auth = new FirebaseSimpleLogin(chatRef, function(error, user) {
		  if (error) {
		    // an error occurred while attempting login
		    console.log(error);
		  } else if (user) {
		    // user authenticated with Firebase
		    console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
		  } else {
			console.log('Logged out.');
		    // user is logged out
		  }
		});
		auth.login('github')
	};
}

