'use strict';

/* Filters */

angular.module('lean.filters', []).

  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }])
// http://stackoverflow.com/questions/14788652/how-to-filter-key-value-with-ng-repeat-in-angularjs
/*  .filter('with', function() {
	  return function(items, field) {
	        var result = {};
	        angular.forEach(items, function(value, key) {
	            if (!value.hasOwnProperty(field)) {
	                result[key] = value;
	            }
	        });
	        return result;
	    };
	}); */