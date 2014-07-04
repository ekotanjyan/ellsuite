define(['angular', 'services'], function (angular) {
	'use strict';

	/* Controllers */

	return angular.module('ellsuite.controllers', ['ellsuite.services'])
		// Sample controller where service is being used
		.controller('SocialShareController', ['$scope', 'Facebook', function ($scope, Facebook) {
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
				$scope.networks.splice(index,1);
			};
			$scope.$watch(function() {
				return Facebook.isReady();
			}, function(newVal) {
				$scope.isFacebookReady = true;
			});

		}])
		.controller('LinkedinNetworksController', ['$scope', 'Linkediner', function($scope, Linkediner) {
			function ReloadLinkedinData(){
				Linkediner.fetch(function(res){
					$scope.$parent.$safeApply(function(){
						$scope.network.items = res.values;
					});				
				})
			};
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
			$scope.refresh = RefreshFacebookFeed;
		}])
		.controller('GooglePlusNetworksController', ['$scope','Google',function($scope, Google){
			Google.fetch(function(res){
				$scope.$safeApply(function(){
					debugger;
					$scope.network.items = res.items || [];
				});
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
		}])
		.controller('SendAndShareController',['$scope',function($scope){
			$scope.sentTo = [];
			$scope.__defineGetter__('providers',function(){
				var __tmp = [];
				return $scope.networks.filter(function(n){
					if(~__tmp.indexOf(n.type)){
						return false;
					}else{
						__tmp.push(n.type);
						return true;
					}
				});
			});
			$scope.__defineGetter__('twitterCounter',function(){
				return 140-$scope.message.length;
			});
			$scope.__defineGetter__('facebookCounter',function(){
				return 420-$scope.message.length;
			});
			$scope.__defineGetter__('googlePlusCounter',function(){
				return 14000-$scope.message.length;
			});
			$scope.__defineGetter__('linkedinCounter',function(){
				return 600-$scope.message.length;
			});

		}])
		.controller('MacrosController',['$scope', 'Macros', function($scope, Macros){
			debugger;
			$scope.macros = [
				{
					"content":"Brrrdshh",
				},
				{
					"content":"Bradsarrdshh",
				}
			]
		}])
		console.log('ON Controllers.js');
});