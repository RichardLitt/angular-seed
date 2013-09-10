var oauth = function($scope, $q, $rootScope, angularFire, myAuthService) {
    $scope.signin = function() {
        var user1 = $scope.cred.user;
        var pass1 = $scope.cred.password;

        myAuthService.auth.login('password', {
            email: user1,
            password: pass1,
            rememberMe: false
        });
    }
    // listen for user auth events
    $rootScope.$on("login", function(event, user) {
        // do login things
        $scope.user = user;
    })
    $rootScope.$on("loginError", function(event, error) {
        // tell the user about the error
    })
    $rootScope.$on("logout", function(event) {
        // do logout things
    })
};