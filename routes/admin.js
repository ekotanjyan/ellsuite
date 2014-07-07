var _ = require('underscore'),
	mongoose = require('mongoose'),
	geocoder = require('geocoder'),
	Macro = mongoose.model('Macro');

//Initers	
require("underscore-keypath");

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
		'get','/config',['admin'],
		function(req, res){
			if(req.query.give){
				res.json( _(req.app.get('config')).valueForKeyPath(req.query.give) );
			}else{
				res.send(400);
			}
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
		'get','/macro',['admin'],
		function(req, res){
			Macro.find({},function(err, macros){
				if(err)return res.json(500, err);
				else res.json(macros);
			});
		}
	],
	[	
		'delete','/macro/:id',['admin'],
		function(req, res){
			Macro.findOneAndRemove({"_id":req.params.id},function(err){
				if(err)return res.json(500, err);
				else res.json({'success':true,"id":req.params.id});
			});
		}
	],
	[	
		'post','/macro',['admin'],
		function(req, res){
			if(req.body){
				var aMacro = Macro(req.body);
				aMacro.save(function(err, macro){
					if(err)return res.json(500, err);
					else res.json({'success':true,"macro":macro});
				})
			}else{
				res.send(400);
			}
		}
	],
	[
		'get','/geocoder',['admin'],
		function(req, res){
			if(isNaN( Number(req.query.lat) + Number(req.query.long) )){
				return res.json(400,{
					"error":true,
					"msg":"Invalid format for LAT an' LONG."
				});
			}else{
				geocoder.reverseGeocode(req.query.lat, req.query.long, function(err, location){
					if(err){
						return res.json(500, {
							"error":true,
							"msg":err
						});
					}else{
						return res.json(200, {
							"success":true,
							"location":location['results'][0]['formatted_address']
						});
					}
				})
			}
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