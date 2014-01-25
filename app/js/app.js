'use strict';

var app = window.app = angular.module('lean', [
  'firebase', 
  'lean.filters', 
  'lean.services', 
  'lean.directives', 
  'angularSpinner',
  'ui.showhide'
  ]);

app.
  value('fbURL', 'https://lean.firebaseio.com/users/').
  factory('fireFactory', [
    function fireFactory() {
        return {
            firebaseRef: function(path) {
                var baseUrl = 'https://lean.firebaseio.com';
                path = (path !== '') ?  baseUrl + '/' + path : baseUrl;
                return new Firebase(path);
            }
        };
    }]).

  config(['$routeProvider', function($routeProvider) {
    $routeProvider.
      when('/', {controller:AuthCtrl, templateUrl:'partials/about.html'}).
      when('/u/:username', {controller:listCtrl, templateUrl:'partials/list.html'}).
      when('/edit/:projectId', {controller:editCtrl, templateUrl:'partials/detail.html'}).
      when('/new', {controller:createCtrl, templateUrl:'partials/detail.html'}).
      when('/dice', {controller:diceCtrl, templateUrl:'partials/dice.html'}).
      otherwise({redirectTo:'/'});
    }
  ])

  // .run( function($rootScope, $location) {

  //   // register listener to watch route changes
  //   $rootScope.$on( "$locationChangeStart", function(event, next, current) {
  //     if ( !$rootScope.user ) {
  //       // no logged user, we should be going to #login
  //       if ( next.templateUrl == "partials/about.html" ) {
  //         // already going to #login, no redirect needed
  //       } else {
  //         // not going to #login, we should redirect now
  //         $location.path( "/" );
  //       }
  //     }         
  //   });
 // })
;
