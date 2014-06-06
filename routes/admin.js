var _ = require('underscore');

module.exports = [
	[
		'get','/',['admin'],
		function(req, res){
			res.render('admin/index',{
				"title":"Index"
			});
		}
	],
	[
		'get','/login',['guest'],
		function(req, res){
			res.render('admin/login');
		}
	],
	[
		'post','/login',['guest'],
		function(req, res){
			if(req.body.email == 'admin@admin.com' && req.body.password == "admin"){
				req.session.user = {
					"isAdmin":true
				};
				if(req.remember){
					req.session.cookie.maxAge = 3600000;
				}
			}
			res.redirect('/admin/')
		}
	],
	[
		'get','/logout',['admin'],
		function(req, res){
			req.session.destroy();
			res.redirect('/admin/')
		}
	],
	[
		'get','/*',['admin'],
		function(req, res){
			res.render('admin/index',{});
		}
	],
];

module.exports.prefix = "/admin";