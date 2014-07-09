define(['angular','LinkedIn', 'Codebird'], function (angular,IN, Codebird) {
	'use strict';
	/* Services */
	angular.module('ellsuite.services', [])
		.factory('Macros',['$resource',function($resource){
			return $resource('/admin/macro/:id');
		}])
		.factory('Google', ['GooglePlus',function (GooglePlus) {
			var FetchActivites = function FetchGooglePlusActivity(cb){
				gapi.client.load('plus','v1',function(){
					var request = gapi.client.plus.activities.list({
						'userId' : 'me',
						'collection' : 'public'
					}).execute(function(resp) {
						cb(resp);
					});
				});
			};
			var Google = {
				me:undefined,
				fetch:function FetchGoogle(cb){
					GooglePlus.getUser().then(function(res){
						if(res.error){
							GooglePlus.login().then(function (authResult) {
					            GooglePlus.getUser().then(function(res){
						            FetchActivites(cb);
						            Google.me = res;
					            });
					        }, function (err) {
					            console.log(err);
					            cb(err);
					        });
						}else{
				            FetchActivites(cb);
				            Google.me = res;
						}
					});
				}
			}
			return Google;
		}])
		.factory('Facebooker', ['Facebook',function (Facebook) {
			var Facebooker = {
				"fetch":function FetchFacebookFeed(cb){
					Facebook.getLoginStatus(function(res){
						if(res.status !== "connected"){
							Facebook.login(function(){
								FetchFacebookData(cb);
							});
						}else{
							FetchFacebookData(cb);
						}
					});
				},
				"me":undefined
			}
			function FetchFacebookData(cb){
				var __tmp = {};
				var __handler = function(feed, me){
					if(feed){
						__tmp.feed = feed;
					}
					if(me){
						__tmp.me = me;
					}
					if(__tmp.feed && __tmp.me){
						Facebooker.me = __tmp.me;	
						cb(__tmp.feed);
					}
				}
				Facebook.api('/me/home', function(res){
					__handler(res);
				});
				if(Facebooker.me){
					__handler(undefined, Facebooker.me)
				}else{
					Facebook.api('/me', function(res){
						__handler(undefined, res);
					});
				}
			}
			return Facebooker;
		}])
		.factory('Linkediner', ['LinkedinAPI',function (IN) {
			function ReloadLinkedinData(callback){
				IN.API.NetworkUpdates("me")
					.fields([''])
				    .result(function(res){
						callback(res);
					});
			};
			return {
				"fetch":function(cb){
					if(IN.User.isAuthorized()){
						ReloadLinkedinData(cb);
					}else{
						IN.User.authorize(function(){
							ReloadLinkedinData(cb);
						})
					}
				}
			};
		}])
		.factory('Twitter', ['$http',function ($http) {
			
			return {
		
			};
		}])
		.factory('Codebird', [function(){
			var cb = new Codebird;
			cb.setConsumerKey("zfXSbJYaS80ZY56QjsguOgfjJ", "IICmsKLLDiDqc9PCN0LBX5aChr5N1uRQNTQRyHwlqV3waMfSd4");
			return cb;
		}])
		.value('LinkedinAPI', IN)
		.value('version', '0.1');
		console.log('ON service.js');
});