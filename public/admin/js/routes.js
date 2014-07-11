define(['angular', 'app'], function(angular, app) {
	'use strict';

	return app.config(['$routeProvider',"$locationProvider"/*, "$http", '$location'*/, function($routeProvider, $locationProvider, $http, $location) {
		$locationProvider.html5Mode(true).hashPrefix('!');
		$routeProvider.when('/admin/socialshare', {
			templateUrl: '/admin/views/root.html',
			controller: 'SocialShareController'
		});
		$routeProvider.when('/admin/',{
			templateUrl: '/admin/views/index.html'
		});
		$routeProvider.when('/admin/logout',{
			controller:function(){
				$http.get({'url':'/admin/logout','method':'POST'})
					.success(function(data, status, headers, config){
						$location.path('/admin/index');
					});
			}
		});
		$routeProvider.otherwise({redirectTo: '/admin/socialshare'});
	}]);

});