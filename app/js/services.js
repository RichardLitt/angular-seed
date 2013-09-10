'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('lean.services', []).
  value('version', '0.1').
  service('myAuthService', ["$rootScope", function($rootScope) {
    var ref = new Firebase("https://lean.firebaseio.com");
    this.auth = new FirebaseSimpleLogin(ref, function(error, user) {
        if (user) {
            $rootScope.$emit("login", user);
        }
        else if (error) {
            $rootScope.$emit("loginError", error);
        }
        else {
            $rootScope.$emit("logout");
        }   
    });
}]);


