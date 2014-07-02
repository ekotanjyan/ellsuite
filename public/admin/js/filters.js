define(['angular', 'services'], function (angular, services) {
	'use strict';

	/* Filters */
  
	angular.module('ellsuite.filters', ['ellsuite.services'])
		.filter('grider',[function(){
			return function(input){
				return Math.round(12/input);
			}
		}])
		.filter('interpolate', ['version', function(version) {
			return function(text) {
				return String(text).replace(/\%VERSION\%/mg, version);
			};
	  	}])
});