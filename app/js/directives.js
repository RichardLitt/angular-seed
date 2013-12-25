'use strict';

/* Directives */


angular.module('lean.directives', []).

  directive("navbar", function() {
      return {
        restrict: "E",
        replace: true,
        controller: AuthCtrl,
        templateUrl: "partials/navbar.html"
      };
  });