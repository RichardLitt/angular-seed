'use strict';

var app = window.app = angular.module('lean', ['firebase', 'lean.filters', 'lean.services']);


// Declare app level module which depends on filters, and services
app.

  value('fbURL', 'https://lean.firebaseio.com/').
  factory('Projects', function(angularFireCollection, fbURL) {
    fbURL = fbURL + 'Projects/';
    return angularFireCollection(fbURL);
  }).
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
      // Commenting this out to check and see if we can not redirect to login afterwords...
      when('/', {controller:'AuthCtrl' /*, templateUrl:'partials/login.html' */}).
      when('/user/:userId', {controller:listCtrl, templateUrl:'partials/list.html'}).
      when('/login', {controller:login, templateUrl:'partials/login.html'}).
      when('/edit/:projectId', {controller:editCtrl, templateUrl:'partials/detail.html'}).
      when('/new', {controller:createCtrl, templateUrl:'partials/detail.html'}).
      otherwise({redirectTo:'/'});
    }
  ]);