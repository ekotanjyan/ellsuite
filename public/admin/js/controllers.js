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
		.controller('LinkedinNetworksController', ['$scope', 'LinkedinAPI', function($scope, IN) {
			function ReloadLinkedinData(){
				IN.API.NetworkUpdates("me")
					.fields([''])
				    .result(function(res){
						$scope.$parent.$safeApply(function(){
							$scope.network.items = res.values;
					    });
					});
			};
			$scope.refresh = ReloadLinkedinData;
		}])
		.controller('FacebookNetworksController', ['$scope', 'Facebook', function($scope, Facebook) {
			function FetchFacebookData(cb){
				Facebook.api('/me/home',cb);
			}
			function RefreshFacebookFeed(){
				debugger;
				FetchFacebookData(function(feed){
					$scope.$parent.$safeApply(function(){
						$scope.network.items = feed.data;
					});
				});
			}
			$scope.refresh = RefreshFacebookFeed; 
		}])
		.controller('NetworksControllerT', ['$scope', '$injector', function($scope, $injector) {
			require(['controllers/NetworksController'], function(myctrl2) {
				// injector method takes an array of modules as the first argument
				// if you want your controller to be able to use components from
				// any of your other modules, make sure you include it together with 'ng'
				// Furthermore we need to pass on the $scope as it's unique to this controller
				$injector.invoke(myctrl2, this, {'$scope': $scope});
			});
		}]);
});