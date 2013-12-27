'use strict';

var AuthCtrl = [
    '$scope',
    '$rootScope',
    '$location',
    'angularFire',
    'fireFactory',
    '$route',

    function AuthCtrl($scope, $rootScope, $location, angularFire, fireFactory, $route) {

        $scope.name = 'AuthCtrl';

        if ($location.path() != '/') {
            $scope.spinner = true;
        }

        var baseurl = 'https://lean.firebaseio.com',
            usersurl = baseurl + '/users/';

        //$scope.usersRef = angularFire(usersurl, $scope, 'users', {});

        $rootScope.$watch('user', function() {
            if ($rootScope.user && ($location.path() == '/')) {                
                $location.url('/u/' + $rootScope.user.username);
            }
        });

        // FirebaseAuth callback
        $scope.authCallback = function(error, user) {
            if (error) {
                console.log('error: ', error.code);
                /*if (error.code === 'EXPIRED_TOKEN') {
                    $location.path('/');
                }*/
            } else if (user) {

                $scope.spinner = false;

                $scope.$apply( 
                    $rootScope.user = user 
                );

                $rootScope.user = $scope.user;
                
                // console.log('Logged In', $scope);
                
                // Store the auth token
                localStorage.setItem('token', user.firebaseAuthToken);
                $scope.isLoggedIn = true;


                $scope.userId = user.id;

                // Set the userRef and add user child refs once
                $scope.userRef = fireFactory.firebaseRef('users').child(user.id);
                $scope.userRef.once('value', function(data) {
                    // Set the userRef children if this is first login
                    var val = data.val();
                    var info = {
                        userId: user.id,
                        name: user.name
                    };
                    // Use snapshot value if not first login
                    if (val) {
                        info = val;
                    }
                    $scope.userRef.set(info); // set user child data once
                });

            } else {
                localStorage.clear();
                $scope.$apply( $rootScope.user = false );
                $scope.isLoggedIn = false;
                $location.path('/');
            }
        };

        var authClient = new FirebaseSimpleLogin(fireFactory.firebaseRef(''), $scope.authCallback);

        $scope.login = function(provider) {
            $scope.token = localStorage.getItem('token');
            var options = {
                'rememberMe': true
            };

            if ($scope.token) {
                console.log('login with token', $scope.token);
                fireFactory.firebaseRef('').auth($scope.token, $scope.authCallback);
            } else {
                console.log('login with authClient');
                authClient.login(provider, options);
            }
                        
        };

        $scope.logout = function() {
            localStorage.clear();
            authClient.logout();
            $location.path('/');
        };

    }
];
