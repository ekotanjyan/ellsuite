define(['angular', 'services', /*'angularSlider'*/], function(angular, services) {
	'use strict';

  /* Directives */

	angular.module('ellsuite.directives', ['ellsuite.services'])
// 		.directive('elGridSlider',['ngSlider', function(){
// // /slider 
// 		}])
		.directive('appVersion', ['version', function(version) {
			return function(scope, elm, attrs) {
				elm.text(version);
		};
	}]);
});