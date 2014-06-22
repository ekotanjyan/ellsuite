define([
	'angular',
	'filters',
	'services',
	'directives',
	'controllers',
	'angularRoute',
	'angularFacebook',
	'angularUnderscore',
	], function (angular, filters, services, directives, controllers, angularUnderscore) {
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
			FacebookProvider.init('262737683876328');
		}])
});

/**
App ID
262737683876328
App Secret
d2f8d7af03330705b42f4b4e53ad29bc
*/