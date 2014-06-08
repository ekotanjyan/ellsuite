define([
	'angular',
	'filters',
	'services',
	'directives',
	'controllers',
	'angularRoute',
	// 'angularFacebook',
	'angularUnderscore',
	], function (angular, filters, services, directives, controllers, angularUnderscore) {
		'use strict';

		// Declare app level module which depends on filters, and services
		return angular.module('ellsuite', [
			'ngRoute',
			// 'facebook',
			'ellsuite.controllers',
			'ellsuite.filters',
			'ellsuite.services',
			'ellsuite.directives'
		])
		// .config(['FacebookProvider',function(FacebookProvider) {
		// 	FacebookProvider.inti();
		// }])

});