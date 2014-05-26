var _ = require('underscore');

module.exports = [
	[
		'get',
		'/',
		function(req, res){
			res.render('index');
		}
	]
];

module.exports.prefix = "/admin";