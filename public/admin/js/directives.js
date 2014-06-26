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
    .directive('elNetworkLinkedinm',function(){
      return {
        "priority":1000,
        // "restrict":"C",
        "link":function($scope, elem, attrs, controller){
          debugger;
        },
        // "templateUrl":"/admin/views/network/linkedin-root.html",
        // "controllerAs":"LinkedinNetworksController",
        "name":"elNetworkLinkedinm"
      }
    });
});