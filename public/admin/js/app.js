define([
	'angular',
	'filters',
	'services',
	'directives',
	'controllers',
	'angularRoute',
	'angularFacebook',
	'angularUnderscore',
	'LinkedIn',			/*Important to keep index at 9-th*/
	'angularGooglePlus',
	'angular-moment',
	'angular-salfapply',
	'angularTrancute',
	'ui.multiselect',
	'angularResource',
	"angularLoader",
	'angular-file-upload',
	'angularLinkify',
	'angularGeolocation',
	'angularAnimate'
	], function (angular, filters, services, directives, controllers, angularRoute, angularFacebook, angularUnderscore, IN) {
		'use strict';

		// Declare app level module which depends on filters, and services
		return angular.module('ellsuite', [
			'ngRoute',
			'ellsuite.controllers',
			'ellsuite.filters',
			'ellsuite.services',
			'ellsuite.directives',
			'angular-underscore',
			'facebook',
			'angularMoment',
			'SafeApply',
			'googleplus',
			'ngResource',
			'angularFileUpload',
			'angular-loading-bar',
			'ngAnimate',
			'multi-select',
			'truncate',
			'linkify',
			'geolocation',
		])
		.config(['FacebookProvider','GooglePlusProvider','cfpLoadingBarProvider', function(FacebookProvider,GooglePlusProvider, cfpLoadingBarProvider) {
			// Turn spinner off for loading bar
			cfpLoadingBarProvider.includeSpinner = false;
			
			// Init Facebook module.
			FacebookProvider.init('255954707893574');
			
			// Init LinkedIn module.
			IN.init({
				"api_key":"75idosjcop3ki9",
				"authorize":true
			});
			// Init Google Plus module.
			GooglePlusProvider.init({
				clientId: '457353786060-7vhqovi3o4n7qn0r45ouu1v3lbfuj4ck.apps.googleusercontent.com',
				apiKey: 'AIzaSyA3eeNYBEkPOe9ddMYNdOL4NijSU3ygfAo'
			});
		}])
});

/**
App ID
262737683876328
App Secret
d2f8d7af03330705b42f4b4e53ad29bc
*/