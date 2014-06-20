define(['angular', 'services', 'angularSlider'], function(angular, services) {
	'use strict';

  /* Directives */

	angular.module('ellsuite.directives', ['ngSlider','ellsuite.services'])
 		.directive('elGridSlider',function(){
      return {
        'require':'ngSlider',
        'priority':1000,
        'controller':function($scope){
          $scope.gridOptions = {
            from:1,
            to:10,
            step:1
          }
        }
      };
 		})
});