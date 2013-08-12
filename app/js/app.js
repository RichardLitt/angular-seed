'use strict';


// Declare app level module which depends on filters, and services
angular.module('lean', ['firebase', 'lean.filters']).
  value('fbURL', 'https://lean.firebaseio.com/').
  factory('Projects', function(angularFireCollection, fbURL) {
    fbURL = fbURL + 'Projects/';
    return angularFireCollection(fbURL);
  }).
  config(function($routeProvider) {
    $routeProvider.
      when('/', {controller:listCtrl, templateUrl:'partials/list.html'}).
      when('/edit/:projectId', {controller:editCtrl, templateUrl:'partials/detail.html'}).
      when('/new', {controller:createCtrl, templateUrl:'partials/detail.html'}).
      otherwise({redirectTo:'/'});
  });