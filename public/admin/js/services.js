define(['angular','LinkedIn'], function (angular,IN) {
	'use strict';

  /* Services */

  // Demonstrate how to register services
  // In this case it is a simple value service.
	angular.module('ellsuite.services', [])
		.value('LinkedinAPI', IN)
		.value('version', '0.1');
});