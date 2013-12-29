'use strict';

/* Filters */

angular.module('lean.filters', [])

 	.filter('interpolate', ['version', function(version) {
	    return function(text) {
	      return String(text).replace(/\%VERSION\%/mg, version);
	    }
	}])

	.filter('orderByImportance', function() {
	  return function(obj) {
	    var array = [];
	    Object.keys(obj).forEach(function(key) {
	      array.push(obj[key]);
	    });
	    array.sort(function(a, b) {
	    	return a.importance - b.importance;
	    }).reverse();
	    return array;
	  }
	})

	.filter('unarchived', function() {
		return function(todos) {
			var newTodos = {};
			angular.forEach(todos, function(value, key) {
				if (value && value.archived && value.archived == true) {
					console.log(value);
					// Do nothing
				} else {
					newTodos[key] = value;
				}
            });
            return newTodos;
		}
	});