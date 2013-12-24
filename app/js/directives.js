'use strict';

/* Directives */


angular.module('lean.directives', []).
  // directive('appVersion', ['version', function(version) {
  //   return function(scope, elm, attrs) {
  //     elm.text(version);
  //   };
  // }]).
  directive("navbar", function() {
      return {
        restrict: "E",
        replace: true,
        controller: AuthCtrl,
        templateUrl: "partials/navbar.html"
      };
  });
//   directive('loginout', function() {
//     return {
//         restrict: 'A',
//         scope: '=',
//         transclude: true,
//         templateUrl: 'views/loginout.html',
//         link: function(scope, element, attrs) {
//             scope.loginWith = true;

//             scope.clients = [
//                 'Twitter',
//                 'Github',
//                 'Facebook'
//             ];

//             var parent = scope.$parent;
//             parent.$watch('isLoggedIn', function(isLoggedIn) {
//                 scope.loggText = (parent.isLoggedIn) ? 'Logout' : 'Login';

//                 if (parent.isLoggedIn) {
//                     scope.loggAction = scope.logout;
//                     scope.loginWith = true;
//                 } else {
//                     scope.loggAction = scope.showClients;
//                 }

//             });

//             scope.showClients = function() {
//                 scope.loginWith = !scope.loginWith;
//                 scope.loggAction = scope.login;
//             };

//             scope.login = function(client) {
//                 parent.login(client);
//             };
//             scope.logout = function() {
//                 parent.logout();
//             };
//         }
//     };
// }).

// directive('isLoggedIn', function() {
//     return {
//         restrict: 'E,A',
//         scope: '@',
//         link: function(scope, elem, attrs) {
//             var parent = scope.$parent;

//             console.log(parent);

//             /*parent.$watch('isLoggedIn', function() {

// 			});*/
//         }
//     };
// });
