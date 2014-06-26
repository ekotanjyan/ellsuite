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
    .directive('elNetworkE',function(){
      return {
        "priority":-1,
        "restrict":"A",
        "link":function($scope, elem, attrs, controller){
          
        },
        // "controllerAs":"FacebookNetworksController",
        // "controller":"@"
        "name":"elNetworkE"
      }
    });
});