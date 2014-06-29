define(['angular','LinkedIn', 'Codebird'], function (angular,IN, Codebird) {
	'use strict';
	/* Services */
	angular.module('ellsuite.services', [])
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
			return {
				fetch:function FetchGoogle(cb){
					GooglePlus.getUser().then(function(res){
						if(res.error){
							GooglePlus.login().then(function (authResult) {
					            FetchActivites(cb);
					        }, function (err) {
					            console.log(err);
					            cb(err);
					        });
						}else{
				            FetchActivites(cb);
						}
					});
				}
			}
		}])
		.factory('Facebooker', ['Facebook',function (Facebook) {
			function FetchFacebookData(cb){
				Facebook.api('/me/home',cb);
			}
			return {
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
				}
			}
		}])
		.factory('Linkediner', ['LinkedinAPI',function (IN) {
			return {
				"fetch":function(cb){
					function ReloadLinkedinData(callback){
						IN.API.NetworkUpdates("me")
							.fields([''])
						    .result(function(res){
								callback(res);
							});
					};
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