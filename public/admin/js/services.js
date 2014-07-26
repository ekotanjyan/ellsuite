define(['angular','LinkedIn', 'Codebird'], function (angular,IN, Codebird) {
	'use strict';
	/* Services */
	angular.module('ellsuite.services', [])
		.factory('Macros',['$resource',function($resource){
			return $resource('/admin/macro/:id');
		}])
		.factory('Google', ['GooglePlus',function (GooglePlus) {
			var fetchMyGoogleProfil = function(){

			}
			var Google = {
				"me":undefined,
				"isLogedin":false,
				"auth": function FetchGooglePlusActivity(cb){
					var $this = this;
					GooglePlus.getUser().then(function(res){
						if(res.error){
							GooglePlus.login().then(function (authResult) {
					            GooglePlus.getUser().then(function(res){
						            $this.isLogedin = true;
						            Google.me = res;
									cb(res);

					            });
					        }, function (err) {
					            cb(err);
					        });
						}else{
							$this.isLogedin = true;
				            Google.me = res;
						}
					});
				},
			};
			Google.fetch = function(type, cb){
				if(Google.isLogedin){
					this[type](cb);
				}else{
					cb(new Error("Call .auth(<cb>) first"));
				}
			}.bind({
				"home":function(cb){
					gapi.client.load('plus','v1',function(){
						var request = gapi.client.plus.activities.list({
							'userId' : 'me',
							'collection' : 'public'
						}).execute(function(resp) {
							cb(resp);
						});
					});
				}
			});
			return Google;
		}])
		.factory('Facebooker', ['Facebook',function (Facebook) {
			var FetchMeFromFacebook = function MEFacebook(cb){
				if(!Facebooker.me){
					Facebook.api('/me/?fields=picture,name', function(me){
						Facebooker.me = me;
						cb();
					});
				}
			}
			var Facebooker = {
				"isLogedin":false,
				"auth":function (cb){
					var $this = this;
					Facebook.getLoginStatus(function(res){
						if(res.status !== "connected"){
							Facebook.login(function(auth){
								if(auth.authResponse){
									$this.isLogedin = true;
									FetchMeFromFacebook(cb);
								}else{
									cb({
										"error":true,
										"msg":"Not authorized."
									})
								}
							}, {'scope':["public_profile", "read_stream", "read_mailbox", 
										"read_page_mailboxes", "rsvp_event", "email", 
										"read_insights", "manage_notifications", "read_friendlists", 
										"manage_pages", "publish_actions", "user_birthday", 
										"user_religion_politics", "user_relationships", "user_relationship_details", 
										"user_hometown", "user_location", "user_likes", 
										"user_activities", "user_interests", "user_education_history", 
										"user_work_history", "user_website", "user_groups", 
										"user_events", "user_photos", "user_videos", "user_friends", 
										"user_about_me", "user_status", "user_games_activity", 
										"user_tagged_places", "user_actions.books", "user_actions.music", 
										"user_actions.video", "user_actions.news"].join(',')});
						}else{
							$this.isLogedin = true;
							FetchMeFromFacebook(cb);
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
						// article.picture = $scope.uploader.queue[0].dataURL;
					}
					Facebook.api('/me/feed', 'post', article, function(res){
						cb(res);
					});
				},
				"me":undefined
			};
			Facebooker.fetch = function(type, cb){
				if(Facebooker.isLogedin){
					this[type](cb);
				}else{
					cb(new Error("Call .auth(<cb>) first"));
				};
			}.bind({
				"news":function FetchFacebookFeed(cb){
					Facebook.api('/me/home', function(res){
						cb(res);
					});
				},
				"newsMedia": function(cb){
					var _objects = [];
					var __handler = function(obj){
						_objects.push(obj);
						if(_objects.length >= 2){
							var shuffle = function shuffle(o){ 
							    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
							    return o;
							};
							cb({"data":shuffle(_objects[0].data.concat(_objects[1].data))});
						};
					};
					Facebook.api('/me/home?filter=app_2305272732', __handler);
					Facebook.api('/me/home?filter=app_2392950137', __handler);
				},
				"timeline": function(cb){
					Facebook.api('me/posts?fields=actions,application,call_to_action,caption,description,created_time,expanded_width,feed_targeting,from,full_picture,height,icon,id,expanded_height,child_attachments,coordinates,is_hidden,is_popular,is_published,link,message,message_tags,name,object_id,parent_id,picture,place,privacy,promotion_status,properties,scheduled_publish_time,shares,source,status_type,story,story_tags,subscribed,targeting,timeline_visibility,to,type,updated_time,via,width,with_tags&with=<value>', function(res){
						cb(res);
					});
				}
			});
			return Facebooker;
		}])
		.factory('Linkediner', ['LinkedinAPI',function (IN) {
			var FetchMeFromLinkedin = function FetchMeFromLinkedin(cb){
				if(Linkediner.me){
					cb();
				}else{
					IN.API.Profile("me").result(function(res){
						Linkediner.me = res['values'][0];
						cb();
					});
				}
			}
			var Linkediner = {
				"isLogedin":false,
				"auth":function(cb){
					var $this = this;
					if(IN.User.isAuthorized()){
						$this.isLogedin = true;
						FetchMeFromLinkedin(cb);
					}else{
						IN.User.authorize(function(){
							$this.isLogedin = true;
							FetchMeFromLinkedin(cb);
						});
					}
				},
				"post":function($scope, cb){
					var article = {};
					if ($scope.message){
						article.message = $scope.message;
					}
					if($scope.link.isShown){
						article.link = $scope.link.value;
					}else if($scope.uploader.queue.length){
						article.picture = $scope.uploader.queue[0].dataURL;
					}
					IN.API.Profile('people/~/shares').method('POST').body(article).result(cb)
				},
				"me":undefined,
			};
			Linkediner.fetch = function(type, cb){
				if(Linkediner.isLogedin){
					this[type](cb);
				}else{
					cb(new Error("Call .auth(<cb>) first."));
				};
			}.bind({
				"newsFeed":function(callback){
					IN.API.NetworkUpdates("me")
						.fields([''])
					    .result(function(res){
							callback(res);
						});
				},
				"profileFeed":function(cb){
					IN.API.MemberUpdates('me')
						.fields([''])
						.result(function(res){
							cb(res)
						});
				}
			});
			return Linkediner;
		}])
		.factory('Codebird', [function(){
			var cb = new Codebird;
			cb.setConsumerKey("zfXSbJYaS80ZY56QjsguOgfjJ", "IICmsKLLDiDqc9PCN0LBX5aChr5N1uRQNTQRyHwlqV3waMfSd4");
			return cb;
		}])
		.value('LinkedinAPI', IN)
		.value('version', '0.1');
});