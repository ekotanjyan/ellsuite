define(['angular', 'services', /*'angularSlider'*/], function(angular, services) {
	'use strict';

  /* Directives */

	angular.module('ellsuite.directives', ['ellsuite.services'])
 		.directive('elGridSlider',['ngSlider', function(){
      return {
        scope: {
        },
        templateUrl: 'my-customer-iso.html'
      };
 		}])
});