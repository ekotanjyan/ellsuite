var _ModuelPrefix  = function(name){return ['libs/',name,'/',name].join('')};
require.config({
    "baseUrl": "/admin/js/",
    "waitSeconds":10000,
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
            "deps":['angular','angularSanitize', 'jquery']
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
        	"exports":"$",
            "deps":[
                'plugins/bootstrap-hover-dropdown/bootstrap-hover-dropdown.min',
                'plugins/jquery-slimscroll/jquery.slimscroll.min',
                'plugins/jquery.blockui.min',
                'plugins/jquery.cokie.min',
                'plugins/uniform/jquery.uniform.min',
                'plugins/jqvmap/jqvmap/jquery.vmap',
                'plugins/jqvmap/jqvmap/maps/jquery.vmap.russia',
                'plugins/jqvmap/jqvmap/maps/jquery.vmap.world',
                'plugins/jqvmap/jqvmap/maps/jquery.vmap.europe',
                'plugins/jqvmap/jqvmap/maps/jquery.vmap.germany',
                'plugins/jqvmap/jqvmap/maps/jquery.vmap.usa',
                'plugins/jqvmap/jqvmap/data/jquery.vmap.sampledata',
                'plugins/flot/jquery.flot.min',
                'plugins/flot/jquery.flot.resize.min',
                'plugins/flot/jquery.flot.categories.min',
                'plugins/jquery.pulsate.min',
                'plugins/bootstrap-daterangepicker/moment.min',
                'plugins/bootstrap-daterangepicker/daterangepicker',
                'plugins/gritter/js/jquery.gritter',
                'plugins/fullcalendar/fullcalendar/fullcalendar.min',
                'plugins/jquery-easy-pie-chart/jquery.easy-pie-chart',
                'plugins/jquery.sparkline.min',
                'core/app',
                'custom/index',
                'custom/tasks',
                'custom/jquery.animateNumber.min'
            ]
        },
        "angularGeolocation":{
            "deps":['angular']
        },
        "angular-file-upload":{
            "deps":['angular']
        },
        "angularLoader":{
            "deps":['angular']
        },
        "angularLinkify":{
            deps:['angular']
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
        "angularAnimate":_ModuelPrefix('angular-animate'),
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
        "angularLoader":'libs/angular-loading-bar/src/loading-bar',
        "angular-moment":_ModuelPrefix('angular-moment'),
        "angular-salfapply":'libs/angular-safeapply/safe-apply',
        "Codebird":'libs/codebird-js/codebird',
        "angularLinkify":"libs/angular-linkify/angular-linkify.min",
        'ui.multiselect':'libs/isteven-angular-multiselect/angular-multi-select',
        "angular-file-upload":_ModuelPrefix('angular-file-upload'),
        "angularTrancute":"libs/angular-truncate/src/truncate",
        "ngMaterial":'http://davo11122.kd.io/material-master/dist/material-design.min',
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