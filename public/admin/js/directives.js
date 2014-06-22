define(['angular', 'services', 'angularSlider'], function(angular, services) {
	'use strict';

  /* Directives */

	angular.module('ellsuite.directives', ['ngSlider','ellsuite.services'])
 		.directive('elGridSlider',function(){
      return {
        'require':'slider',
        'priority':1000,
        'controller':function($scope){
          $scope.gridOptions = {
            from:1,
            to:10,
            smooth:true,
            step:1
          }
        }
      };
 		})
    //Network controllers
    .directive('elNetwork',function(){
      return {
        "restrict":"A",
        "link":function($scope, attrs, type){
          debugger
        },
        // "controllerAs":"FacebookNetworksController",
        "controller":"@"
      }
    });
});