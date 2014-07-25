	define(['angular', 'services'], function (angular) {
	'use strict';

	/* Controllers */

	return angular.module('ellsuite.controllers', ['ellsuite.services'])
		// Sample controller where service is being used
		.controller('SocialShareController', 
			['$scope', 
			'$rootScope', 
			'$interval',
			'Facebooker',
			'Google', 
			'Linkediner',
			'Codebird',
			'toaster', function ($scope, $rootScope, $interval, Facebooker, Google, Linkediner, Codebird, toaster) {
			$scope.networks = [];
			$scope.providers = [{
				"isReady":false,
				"iconClass":"fa fa-facebook fa-fw",
				"name":"Facebook",
				"init":function(){
					var _this = this;
					Facebooker.auth(function(res){
						if(res && res.error){
							toaster.pop('error', 'Facebook not authenticated.','Check your connection and try one more time.');
						}else{
							_this.isReady = true;
							toaster.pop('success', 'Facebook authenticated.','Connected to ' + Facebooker.me.name);
						}
					});
				},
				"feeds":[{
						"name":"News Feed",
						"create":function(){
							$scope.create('facebook','news');
						}
					},{
						"name":"Media Feed",
						"create":function(){
							$scope.create('facebook', 'newsMedia');
						}
					},{
						"name":"Timeline",
						"create":function(){
							$scope.create('facebook', 'timeline');
						}
					},
				],
				"profile":{},
				"__proto__":Facebooker,
			},{
				"isReady":false,
				"iconClass":"fa fa-linkedin fa-fw",
				"name":"Linkedin",
				"init":function(){
					Linkediner.auth(function(){
						this.isReady = true; 
						consle.log('asdsa', arguments);
					});
				},
				"feeds":[
					{
						"name":"News feed",
						"create":function(){
							$scope.create('linkedin', 'newsFeed');
						}
					},
					{
						"name":"Profile feed",
						"create":function(){
							$scope.create('linkedin', 'profileFeed');
						}
					},
				],
				"profile":{},
				"__proto__":Linkediner,
			},{
				"isReady":false,
				"iconClass":"fa fa-twitter fa-fw",
				"name":"Twitter",
				"init":function(){
					Facebooker.auth(function(){
						consle.log('asdsa', arguments);
					});
				},
				"profile":{},
			},{
				"isReady":false,
				"iconClass":"fa fa-google-plus fa-fw",
				"name":"Google+",
				"init":function(){
					Facebooker.auth(function(){
						consle.log('asdsa', arguments);
					});
				},
				"profile":{},
			},];
			$scope.grid = 2;
			$scope.create = function CreatNetwork(type, option){
				var _return;
				if(type){
					_return = {
						"type":type,
						"createTime":Date.now(),
						"items":[],
						"option":option || null
					}
					$scope.networks.push(_return);
				}
				return _return;
			}
			$scope.close = function RemoveNetwork(index){
				$scope.networks.splice(index, 1);
			};
			$scope.$watchCollection	('networks',function(){
				$scope.$broadcast('networksEdited');
			});
			$scope.networks.refresh = function(){
				$rootScope.$broadcast('refreshFeed');
			}
			var _schedule;
			$scope.networks.schenduleFor = function(aMin){
				if(_schedule){
					$interval.cancel(_schedule);
				}
				if(aMin !== 0){
					_schedule = $interval($scope.networks.refresh, aMin);
				}
			}
		}])
		.controller('LinkedinNetworksController', ['$scope', 'Linkediner', function($scope, Linkediner) {
			$scope.network.profile = {};
			$scope.isToolsShown = false;
			function ReloadLinkedinData(){
				Linkediner.fetch(function(res){
					$scope.$parent.$safeApply(function(){
						$scope.network.items = res.values;
						$scope.network.profile = Linkediner.me;
						$scope.network.profile.picture = Linkediner.me.pictureUrl;
					});				
				})
			};
			$scope.$on('refreshFeed', function(){
				$scope.refresh();
			});
			$scope.showTools = function(){
				$scope.isToolsShown = !$scope.isToolsShown; 
			}
			$scope.refresh = ReloadLinkedinData;
			
		}])
		.controller('FacebookNetworksController', ['$scope', 'Facebooker', function($scope, Facebooker) {
			$scope.network.profile = {};
			$scope.isToolsShown = false;
			
			function RefreshFacebookFeed(){
				Facebooker.fetch($scope.network.option, function FetchTheFeed(feed) {
					$scope.$parent.$safeApply(function(){
						$scope.network.items = feed.data;
						$scope.network.profile.picture = 'https://graph.facebook.com/v2.0/' + Facebooker.me.id + '/picture'
					});
				})
			}
			$scope.$on('refreshFeed', function(){
				$scope.refresh();
			});
			$scope.showTools = function(){
				$scope.isToolsShown = !$scope.isToolsShown; 
			}
			
			/* Article Sharing*/
			$scope.$on('shareArticle',function($event, post){
				Facebooker.post(post, function(){
					alert('asd')
				});
			});

			$scope.refresh = RefreshFacebookFeed;
		}])
		.controller('GooglePlusNetworksController', ['$scope','Google',function($scope, Google){
			$scope.network.profile = {};
			$scope.isToolsShown = false;
			var refresh = function RefreshGooglePlus(){
				Google.fetch(function(res){
					$scope.$safeApply(function(){
						$scope.network.items = res.items || [];
						$scope.network.profile = Google.me;
					});
				});
			}
			$scope.refresh = refresh;
			$scope.$on('refreshFeed', function(){
				$scope.refresh();
			});
			$scope.showTools = function(){
				$scope.isToolsShown = !$scope.isToolsShown; 
			}
		}])
		.controller('TwitterNetworksController', ['$scope', 'Codebird', function ($scope, cb) {
		// gets a request token
			$scope.isToolsShown = false;

			cb.__call(
			    "oauth_requestToken",
			    {oauth_callback: "oob"},
			    function (reply) {
			        // stores it
			        cb.setToken(reply.oauth_token, reply.oauth_token_secret);

			        // gets the authorize screen URL
			        cb.__call(
			            "oauth_authorize",
			            {},
			            function (auth_url) {
			                window.codebird_auth = window.open(auth_url);
			            }
			        );
			    }
			);
			$scope.$on('refreshFeed', function(){
				$scope.refresh();
			});
			$scope.showTools = function(){
				$scope.isToolsShown = !$scope.isToolsShown; 
			}
		}])
		.controller('SendAndShareController',
			['$scope', '$rootScope','geolocation', '$http', '$fileUploader', function($scope, $rootScope, geolocation, $http, $fileUploader){
			$scope.$on('resetForm', function(){
				$scope.$safeApply(function(){
					$scope.sendTo = [];
					$scope.message = '';
					$scope.location.isShown = false;
					$scope.link.value = '';
					$scope.uploader.clearQueue();
					angular.forEach($scope.providers, function(_p){_p.isOn = false;});
				});
			});
			$scope.sendTo = [];
			$scope.message = '';
			$scope.location = {
				"isShown":false,
				"position":undefined
			}
			var providersFilter = function(){
				var __tmp = [];
				return $scope.networks.filter(function(n){
					if(~__tmp.indexOf(n.type)){
						return false;
					}else{
						__tmp.push(n.type);
						return true;
					}
				});
			};
			$scope.providers = providersFilter();
			$scope.$on('networksEdited',function(){
				$scope.providers = providersFilter();
			});
			var detectLocation = function DetectLocationForShare(cb){
				geolocation.getLocation().then(function(data){

					$http.get('/admin/geocoder',{"params":{"lat":data.coords.latitude, "long":data.coords.longitude}})
						.success(function SuccessHandler(res){
							cb(null, res);
						}).error(function ErrorHandler(res){
							cb(res);
						})
			    });
			};
			var CounterProvider = function($scope, aLenght){return function(){return aLenght-$scope.message.length;}}
			$scope.__defineGetter__('twitterCounter',CounterProvider($scope, 140));
			$scope.__defineGetter__('facebookCounter',CounterProvider($scope, 420));
			$scope.__defineGetter__('googlePlusCounter',CounterProvider($scope, 14000));
			$scope.__defineGetter__('linkedinCounter',CounterProvider($scope, 600));
			$scope.$on('setMacroOnSharebox',function($event, aMacro){
				$scope.message += ($scope.message.length?" ":"") + aMacro.content;
			});
			$scope.beforeMacroOpen = function(){
				$rootScope.$broadcast('giveCurrentMessage',$scope.message);
			}
			$scope.showLocation = function ShowLocation(){
				if($scope.location.isShown){
					$scope.location.isShown = false;
				}else{
					if(!$scope.location.position){
						detectLocation(function(err, res){
							if(err)return alert('Error: ' + err.msg);
							$scope.$safeApply(function(){
								$scope.location.position = res.location;
							});
						});
					}
					$scope.location.isShown = true;
				}
			}
			$scope.link = {
				add:function(){
					$scope.link.value = 'http://';
				},
				destroy:function(){
					$scope.link.value = '';
				},
				value:''
			}
			window.uploader = $scope.uploader = $fileUploader.create({
				scope: $scope,
				autoUpload: true,
				url: '/admin/socialshare/attachImage'
			});
			$scope.share = function(){
				$rootScope.$broadcast('shareArticle', $scope);
			}
		}])
		.controller('MacrosController',['$scope', '$http', '$rootScope', function($scope, $http, $rootScope){	
			var __macroPath = '/admin/macro'; 
			$scope.message = '';
			$http.get(__macroPath).success(function(res){
				$scope.$safeApply(function(){
					$scope.macros = res;
				});
			});
			$scope.delete = function(index){
			    $http.delete(__macroPath + '/' + $scope.macros[index]['_id']);
				$scope.macros.splice(index, 1);
			};
			$scope.useMacro = function(id){
				var aMacro;
				angular.forEach($scope.macros, function(macro){
					if(macro._id == id) aMacro = macro;
				});
				if(aMacro){
					$rootScope.$broadcast('setMacroOnSharebox',aMacro);
					$('#macros').modal('hide');
				}else{
					throw "UNKNOWN MACRO.";
				}
			}
			$scope.$on('giveCurrentMessage',function($event, message){
				$scope.message = message;
			});
			$scope.save = function(){
				$http.post(__macroPath,{'content':$scope.message}).success(function(data){
					$scope.macros.unshift(data.macro);
				});
			};
		}])
		console.log('ON Controllers.js');
});