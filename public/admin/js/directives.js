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
    .directive('elNetworker',['$http', '$compile', '$interpolate', function($http, $compile, $interpolate){
      return {
        "priority":500,
        "replace": true,
        "link":function($scope, elem, attrs, controller){
          $http.get($interpolate('/admin/views/network/{{type}}-root.html')({type:$scope.network.type})).then(function(res){
            elem.html($compile(res.data)($scope));
          });
        },
        "name":"elNetworker"
      }
    }]);
});