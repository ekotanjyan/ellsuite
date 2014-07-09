var _ModuelPrefix  = function(name){return ['libs/',name,'/',name].join('')};
require.config({
    "baseUrl": "/admin/js/",
    "waitSeconds":0,
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
            "deps": ["angular","underscore"]
        },
        'jquery.slider':{
          "deps":['angularSanitize']
        },
        'angularSlider':{
            "deps":['angular','angularSanitize']
        },
        'angularSanitize':{
          "deps":["angular"]
        },
        'angularFacebook':{
            "deps":['angular']
        },
        "LinkedIn":{
            "exports":"IN",
        },
        "angularGooglePlus":{
            "deps":['angular']
        },
        "Codebird":{
            "exports":"Codebird"
        },
        "angular-salfapply":{
            "deps":['angular']
        },
        "ui.multiselect":{
            "deps":['angular']
        },
        "jquery":{
        	"exports":"$"
        },
        "angularGeolocation":{
            "deps":['angular']
        },
        "ngFlow":{
            "deps":['angular']
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
        "angularSlider":'libs/ng-slider/src/ng-slider',
        'jquery.slider':'libs/ng-slider/src/jquery.slider',
        'angularFacebook':'libs/angular-facebook/lib/angular-facebook',
        'angularGeolocation':'libs/angularjs-geolocation/src/geolocation',
        "angularSanitize":_ModuelPrefix('angular-sanitize'),
	    "LinkedIn":"http://platform.linkedin.com/in.js?async=true",
        "moment":'libs/moment/moment',
        "angularGooglePlus":'libs/angular-google-plus/src/angular-google-plus',
        "angular-moment":_ModuelPrefix('angular-moment'),
        "angular-salfapply":'libs/angular-safeapply/safe-apply',
        "Codebird":'libs/codebird-js/codebird',
        'ui.multiselect':'libs/isteven-angular-multiselect/angular-multi-select',
        "angular-file-upload":_ModuelPrefix('angular-file-upload'),
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