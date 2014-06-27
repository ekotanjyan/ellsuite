define(['angular','LinkedIn'], function (angular,IN) {
	'use strict';

  /* Services */

  // Demonstrate how to register services
  // In this case it is a simple value service.
	angular.module('ellsuite.services', [])
		.factory('Google', ['GooglePlus',function (GooglePlus) {
			return {
				fetch:function FetchGoogle(cb){
					GooglePlus.getUser().then(function(res){
						if(res.error){
							GooglePlus.login().then(function (authResult) {
					            console.log(authResult);
					            GooglePlus.getUser().then(function (user) {
					                console.log(user);
					            });
					            cb();
					        }, function (err) {
					            console.log(err);
					        });
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
						if(res.setatus !== "connected"){
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
					if(LinkedinAPI.User.isAuthorized()){
						ReloadLinkedinData(cb);
					}else{
						LinkedinAPI.User.authorize(function(){
							ReloadLinkedinData(cb);
						})
					}
				}
			};
		}])
		.value('LinkedinAPI', IN)
		.value('version', '0.1');
});