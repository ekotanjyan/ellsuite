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
	  	.filter('fbStoryAsTitle',['$interpolate', function($interpolate){
	  		return function(item){
	  			// return item.story.replace(item.from.name, $interpolate('{{name}} / ')(item.from.name))
	  			return item.story.replace(item.from.name, item.from.name + ' | ');
	  		}
	  	}])
	  	.filter('fbStoryAsBody',['$interpolate', function($interpolate){
	  		return function(item){

	  		}
	  	}])
	  	.filter('elNetworkIsReady',[function(){
	  		return function(providers){
	  			var _tmp = [];
	  			angular.forEach(providers, function(provider){
	  				if(provider.isReady){
	  					_tmp.push(provider);
	  				}
	  			});
	  			return _tmp;
	  		}
	  	}])
});