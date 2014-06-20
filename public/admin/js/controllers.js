define(['angular', 'services'], function (angular) {
	'use strict';

	/* Controllers */

	return angular.module('ellsuite.controllers', ['ellsuite.services'])
		// Sample controller where service is being used
		.controller('SocialShareController', ['$scope', 'Facebook', function ($scope, Facebook) {
			$scope.networks = [];
			$scope.grid = 4;
			$scope.create = function CreatNetwork(type){
				var _return;
				if(type){
					_return = {
						"type":type,
						"createTime":Date.now(),
						"items":[{
							"text":"Something " + (new Date)
						}]
					}
					$scope.networks.push(_return);
				}
				return _return;
			}
			$scope.close = function RemoveNetwork(index){
				$scope.networks.splice(index,1);
			};
			var _tmp;
			for(var i= 0;i<2;i++){
				_tmp = $scope.create('twitter');
				for(var j= 0;j<2;j++){	
					_tmp.items.push({
						"text":"Something " + (new Date)
					});
				}
			};

		}])
		// More involved example where controller is required from an external file
		.controller('NetworksController', ['$scope', '$injector', function($scope, $injector) {
			
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