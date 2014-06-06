define(['angular', 'app'], function(angular, app) {
	'use strict';

	return app.config(['$routeProvider',"$locationProvider", function($routeProvider, $locationProvider) {
		$locationProvider.html5Mode(true).hashPrefix('!');
		$routeProvider.when('/admin/socialshare', {
			templateUrl: '/admin/views/root.html',
			controller: 'SocialShareController'
		})
		$routeProvider.otherwise({redirectTo: '/admin/socialshare'});
	}]);

});