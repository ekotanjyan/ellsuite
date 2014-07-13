define(['angular', 'services', 'angularSlider'], function(angular, services) {
	'use strict';

  /* Directives */

	angular.module('ellsuite.directives', ['ngSlider','ellsuite.services'])
 		.directive('elGridSlider',function(){
      return {
        'require':'slider',
        'priority':1000,
        'controller':function($scope){
          $scope.gridOptions = {
            from:1,
            to:4,
            smooth:true,
            step:1
          }
        }
      };
 		})
    .directive('elResetShare', ['$rootScope',function ($rootScope) {
      return {
        restrict: 'A',
        link: function (scope, iElement, iAttrs) {
          iElement.on('hide.bs.modal',function(){
            $rootScope.$broadcast('resetForm');
          });
        }
      };
    }])
    .directive('ngThumb', ['$window', function($window) {
        var helper = {
            support: !!($window.FileReader && $window.CanvasRenderingContext2D),
            isFile: function(item) {
                return angular.isObject(item) && item instanceof $window.File;
            },
            isImage: function(file) {
                var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        };

        return {
            restrict: 'A',
            // template: '<canvas/>',
            // transclude: true,
            link: function(scope, element, attributes) {
                if (!helper.support) return;

                var params = scope.$eval(attributes.ngThumb);

                if (!helper.isFile(params.file)) return;
                if (!helper.isImage(params.file)) return;

                var canvas = element.find('canvas');
                var reader = new FileReader();

                reader.onload = onLoadFile;
                reader.readAsDataURL(params.file);

                function onLoadFile(event) {
                    var img = new Image();
                    img.onload = onLoadImage;
                    img.src = event.target.result;
                }

                function onLoadImage() {
                    var width = params.width || this.width / this.height * params.height;
                    var height = params.height || this.height / this.width * params.width;
                    canvas.attr({ width: width, height: height });
                    canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
                }
            }
        };
    }])
    //Network controllers
    .directive('elNetworker',['$http', '$compile', '$interpolate', function($http, $compile, $interpolate){
      return {
        "priority":500,
        "replace": true,
        "link":function($scope, elem, attrs, controller){
          $http.get($interpolate('/admin/views/network/{{type}}-root.html')({type:$scope.network.type})).then(function(res){
            elem.html($compile(res.data)($scope));
          });
        },
        "name":"elNetworker"
      }
    }])
    .directive('elFacebookArticle', ['$templateCache', function ($templateCache) {
        return {
            "restrict": 'A',
            "templateUrl":"/admin/views/network/facebook-article.html",
            link: function ($scope, $element, $attrs) {
                
            },
            controller:function($scope){

            }
        };
    }]);
});