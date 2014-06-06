define(['angular', 'services'], function (angular, services) {
	'use strict';

	/* Filters */
  
	angular.module('ellsuite.filters', ['ellsuite.services'])
		.filter('interpolate', ['version', function(version) {
			return function(text) {
				return String(text).replace(/\%VERSION\%/mg, version);
			};
	}]);
});