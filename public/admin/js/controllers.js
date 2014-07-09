	define(['angular', 'services'], function (angular) {
	'use strict';

	/* Controllers */

	return angular.module('ellsuite.controllers', ['ellsuite.services'])
		// Sample controller where service is being used
		.controller('SocialShareController', ['$scope', 'Facebook', '$rootScope', '$interval', function ($scope, Facebook, $rootScope, $interval) {
			$scope.networks = [];
			$scope.grid = 2;
			$scope.create = function CreatNetwork(type){
				var _return;
				if(type){
					_return = {
						"type":type,
						"createTime":Date.now(),
						"items":[]
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
			$scope.$watch(function() {
				return Facebook.isReady();
			}, function(newVal) {
				$scope.isFacebookReady = true;
			});
			$scope.networks.refresh = function(){
				$rootScope.$broadcast('refreshFeed');
			}
			var _schedule;
			$scope.networks.schenduleFor = function(aMin){
				if(_schedule){
					$interval.cancel(_schedule);
				}
				if(aMin === 0){
					_schedule = $interval($scope.networks.refresh, aMin);
				}
			}
		}])
		.controller('LinkedinNetworksController', ['$scope', 'Linkediner', function($scope, Linkediner) {
			function ReloadLinkedinData(){
				Linkediner.fetch(function(res){
					$scope.$parent.$safeApply(function(){
						$scope.network.items = res.values;
					});				
				})
			};
			$scope.$on('refreshFeed', function(){
				$scope.refresh();
			});
			$scope.refresh = ReloadLinkedinData;
		}])
		.controller('FacebookNetworksController', ['$scope', 'Facebooker', function($scope, Facebooker) {
			function RefreshFacebookFeed(){
				Facebooker.fetch(function(feed){
					$scope.$parent.$safeApply(function(){
						$scope.network.items = feed.data;
					});
				});
			}
			$scope.$on('refreshFeed', function(){
				$scope.refresh();
			});
			$scope.refresh = RefreshFacebookFeed;
		}])
		.controller('GooglePlusNetworksController', ['$scope','Google',function($scope, Google){
			var refresh = function RefreshGooglePlus(){
				Google.fetch(function(res){
					$scope.$safeApply(function(){
						debugger;
						$scope.network.items = res.items || [];
					});
				});
			}
			$scope.refresh = refresh;
			$scope.$on('refreshFeed', function(){
				$scope.refresh();
			});
		}])
		.controller('TwitterNetworksController', ['$scope', 'Codebird', function ($scope, cb) {
		// gets a request token
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
		}])
		.controller('SendAndShareController',
			['$scope', '$rootScope','geolocation', '$http', '$fileUploader', function($scope, $rootScope, geolocation, $http, $fileUploader){
			$scope.sentTo = [];
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
				autoUpload:true,
				url: '/admin/socialshare/attachImage'
			});
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
				var aMacro = $scope.macros.find(function(macro){
					if(macro._id == id)return macro;
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