var _ModuelPrefix  = function(name){return ['libs/',name,'/',name].join('')};
require.config({
    "baseUrl": "/admin/js/",
    "shim": {
        "angular": {
            "exports": "angular"
        },
        "angularResource": {
            "deps": ["angular"]
        },
        "angularCookies": {
            "deps": ["angular"]
        }, 
        "angularRoute": {
            "deps": ["angular","angularScenario"]
        },
        'angularUnderscore':{
            "deps": [
            	"angular",
            	"underscore"
            ]
        },
        // 'jquery.slider':{
        //     "deps":['jquery']
        // },
        // 'angularFacebook':{
        //     "deps":['angular']
        // },
        // 'angularSlider':{
        //     "deps":['angular']
        // },
        "jquery":{
        	"exports":"$"
        }
    },
    "priority": [
		"angular"
	],
    "paths": {
	    "angular": _ModuelPrefix('angular'),
	    "jquery": _ModuelPrefix('jquery'),
	    "bootstrap-sass": _ModuelPrefix('bootstrap-sass'),
	    "angularResource": _ModuelPrefix('angular-resource'),
	    "angularCookies": _ModuelPrefix('angular-cookies'),
	    "angularRoute": _ModuelPrefix('angular-route'),
	    "underscore":_ModuelPrefix('underscore'),
	    "angularScenario": _ModuelPrefix('angular-scenario'),
        // "angularSlider":'libs/ng-slider/src/ng-slider',
        // 'jquery.slider':'libs/ng-slider/src/jquery.slider',
        // 'angularFacebook':'libs/angular-facebook/lib/angular-facebook',
	    "angularUnderscore": _ModuelPrefix('angular-underscore')
    }
});
window.name = "NG_DEFER_BOOTSTRAP!";
require( [
	'angular',
	'app',
	'routes'
],function(angular, app, routes){
	'use strict';
	var $html = angular.element(document.getElementsByTagName('html')[0]);
	angular.element().ready(function() {
		angular.resumeBootstrap([app['name']]);
	});
});