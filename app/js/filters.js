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
	    return _.sortBy(array, function(todo){return todo.importance}).reverse();
	  }
	})

	.filter('unarchived', function() {
		return function(todos) {
			var newTodos = {};
			angular.forEach(todos, function(value, key) {
				if (value && value.archived && value.archived == true) {
					// Do nothing
				} else {
					newTodos[key] = value;
				}
            });
            return newTodos;
		}
	})

	.filter('newlines', function () {
	    return function(text) {
	    	if (text) {
		        return text.replace(/\n/g, '<br/>');
	    	}
	    }
	})
	
	.filter('noHTML', function () {
	    return function(text) {
	    	if (text) {
		        return text
		                .replace(/&/g, '&amp;')
		                .replace(/>/g, '&gt;')
		                .replace(/</g, '&lt;');
	    	}
	    }
	});