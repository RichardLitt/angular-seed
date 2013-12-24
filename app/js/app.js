'use strict';

var app = window.app = angular.module('lean', ['firebase', 'lean.filters', 'lean.services']);


// Declare app level module which depends on filters, and services
app.

  value('fbURL', 'https://lean.firebaseio.com/users/').
  // factory('projects', ['$rootScope', function($rootScope, angularFireCollection, fbURL) { 
  //   if ($rootScope.user) {
  //     fbURL = fbURL + $rootScope.user.id + '/projects/';
  //     return angularFireCollection(fbURL);
  //   } else {
  //     console.log('Not authenticated');
  //   }
  // }]).
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
  config([
    '$routeProvider',

    function($routeProvider) {
    $routeProvider.
      when('/', {controller:AuthCtrl}).
      when('/user/:userId', {controller:listCtrl, templateUrl:'partials/list.html'}).
      when('/edit/:projectId', {controller:editCtrl, templateUrl:'partials/detail.html'}).
      when('/new', {controller:createCtrl, templateUrl:'partials/detail.html'}).
      otherwise({redirectTo:'/'});
    }
  ]);
