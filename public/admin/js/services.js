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
							}, {scope:'read_stream,user_likes,user_status,offline_access,user_photos,publish_stream,publish_actions,manage_pages,photo_upload,user_hometown,user_location,user_checkins,friends_likes,friends_photos,friends_status,friends_videos,share_item'});
						}else{
							FetchFacebookData(cb);
						}
					});
				},
				"post":function PostToFacebook($scope, cb){
					var article = {};
					if ($scope.message){
						article.message = $scope.message;
					}
					if($scope.link.isShown){
						article.link = $scope.link.value;
					}else if($scope.uploader.queue.length){
						article.picture = $scope.uploader.queue[0].dataURL;
					}
					Facebook.api('/me/feed', 'post', article, function(res){
						console.log( res.code );
						cb(res);
					});
				},
				"fetchMedia": function ffetcher(cb){
					var _this = this;
					_this.fetch(function(res){
						var __tmp = [];
						angular.forEach(res.data,function(item){
							if(item.type == 'video' || item.type == 'photo'){
								__tmp.push(item);
							}
						});
						cb(__tmp);
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
			var ReloadLinkedinData = function ReloadLinkedinData(callback){
				if(Linkediner.me){
					IN.API.NetworkUpdates("me")
						.fields([''])
					    .result(function(res){
							callback( res );
						});
				}else{
					IN.API.Profile("me").result(function(res){
						Linkediner.me = res['values'][0];
						ReloadLinkedinData(callback);
					});
				}
			};
			var Linkediner = {
				"me":undefined,
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
			return Linkediner;
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
});