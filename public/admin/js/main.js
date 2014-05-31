var _ModuelPrefix  = function(name){return ['libs/',name,'/',name].join()};
require.config({
    "baseUrl": "/admin/js/",

    "shim": {
        "angular": {
            "exports": "angular"
        },
        "angular-resource": {
            "deps": ["angular"]
        },
        "angular-cookies": {
            "deps": ["angular"]
        },
        "angular-route": {
            "deps": ["angular"]
        },
        'underscore': {
        	"exports": '_'
		},
    },
    "priority": [
		"angular"
	],
    "paths": {
	    "angular": _ModuelPrefix('angular'),
	    "jquery": _ModuelPrefix('jquery'),
	    "bootstrap-sass": _ModuelPrefix('bootstrap-sass'),
	    "angular-resource": _ModuelPrefix('angular-resource'),
	    "angular-cookies": _ModuelPrefix('angular-cookies'),
	    "angular-route": _ModuelPrefix('angular-route'),
	    "underscore": _ModuelPrefix('underscore')   
    }
});
require( [
	'angular',
	'app',
	'routes'
], function(angular, app, routes) {
	
});