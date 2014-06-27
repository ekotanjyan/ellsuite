define(['angular', 'services'], function (angular) {
	'use strict';

	/* Controllers */

	return angular.module('ellsuite.controllers', ['ellsuite.services'])
		// Sample controller where service is being used
		.controller('SocialShareController', ['$scope', 'Facebook', function ($scope, Facebook) {
			$scope.networks = [];
			$scope.grid = 2;
			$scope.create = function CreatNetwork(type){
				var _return;
				if(type){
					_return = {
						"type":type,
						"createTime":Date.now(),
						"items":[]
					}
					$scope.networks.push(_return);
				}
				return _return;
			}
			$scope.close = function RemoveNetwork(index){
				$scope.networks.splice(index,1);
			};
			$scope.$watch(function() {
				return Facebook.isReady();
			}, function(newVal) {
				$scope.isFacebookReady = true;
			});

		}])
		.controller('LinkedinNetworksController', ['$scope', 'Linkediner', function($scope, Linkediner) {
			function ReloadLinkedinData(){
				Linkediner.fetch(function(res){
					$scope.$parent.$safeApply(function(){
						$scope.network.items = res.values;
					});				
				})
			};
			$scope.refresh = ReloadLinkedinData;
		}])
		.controller('FacebookNetworksController', ['$scope', 'Facebooker', function($scope, Facebooker) {
			function RefreshFacebookFeed(){
				Facebooker.fetch(function(feed){
					$scope.$parent.$safeApply(function(){
						$scope.network.items = feed.data;
					});
				});
			}
			$scope.refresh = RefreshFacebookFeed;
			RefreshFacebookFeed();
		}])
		.controller('GooglePlusNetworksController', ['$scope','Google',function($scope, Google){
			Google.fetch(function(res){
				$scope.safeApply(function(){
					$scope.network.items = res || [];
				});
			});
		}])
});