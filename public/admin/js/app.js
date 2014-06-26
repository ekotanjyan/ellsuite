define([
	'angular',
	'filters',
	'services',
	'directives',
	'controllers',
	'angularRoute',
	'angularFacebook',
	'angularUnderscore',
	'LinkedIn',
	], function (angular, filters, services, directives, controllers, angularRoute, angularFacebook, angularUnderscore, IN) {
		'use strict';

		// Declare app level module which depends on filters, and services
		return angular.module('ellsuite', [
			'ngRoute',
			'ellsuite.controllers',
			'ellsuite.filters',
			'ellsuite.services',
			'ellsuite.directives',
			'facebook'
		])
		.config(['FacebookProvider',function(FacebookProvider) {
			FacebookProvider.init('423840851054944');
			IN.init({
				"api_key":"75idosjcop3ki9",
				"authorize":true
			});
			window.brr = IN;
		}])
});

/**
App ID
262737683876328
App Secret
d2f8d7af03330705b42f4b4e53ad29bc
*/