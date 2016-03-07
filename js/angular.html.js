(function () {

	var app = angular.module('html', []);
	
	app.run(function($window, $rootScope) {
	  $rootScope.online = navigator.onLine;
	  $window.addEventListener("offline", function () {
		$rootScope.$apply(function() {
		  $rootScope.online = false;
		});
	  }, false);
	  $window.addEventListener("online", function () {
		$rootScope.$apply(function() {
		  $rootScope.online = true;
		});
	  }, false);
	});

	app.directive('myHref', function($parse) {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
			    var url = $parse(attrs.myHref)(scope);
			    element.attr('href', url);
			}
		}
	});

	app.filter("rounded",function(){    
		return function(val,to){
			var val = parseFloat(val) || eval(val);
			if(parseFloat(val)) {
				return val.toFixed(to || 0);
			} else return 0;
		}
	});

	app.filter("price",function(){    
		return function(val,to){
			var value = parseFloat(val) || 0;
			value = value.formatMoney(to);
			return value;
			
		}
	});

	app.filter("positive",function(){    
		return function(val,to){
			var value = parseFloat(val) || 0;
			value = value < 0 ? 0 : value;
			return value;
			
		}
	});

	app.directive('ngVideo', function() {

		var html = "";
			 html += '<video id="{{id}}" class="video-js vjs-default-skin" controls preload="auto" width="{{width}}" height="{{height}}" data-setup="">';
			 html += '<source src="{{url}}" type="video/mp4" />';
	//			 html += '<source src="{{url}}" type="video/webm" />';
	//			 html += '<source src="{{url}}" type="video/ogg" />';
	//			 html += '<source src="{{url}}" type="audio/mp3"/>';
			 html += '</video>';

		return {
			restrict: 'E',
			scope: {
				id: '@',
				url: '@',
				height:'@',
				width:'@',
			},
			template:html,
		};
	});

	// Direction pour ajouter une fonction 
	// <htmldiv content="function()"></htmldiv>
	app.directive('htmldiv', function($compile, $parse) {
	return {
	  restrict: 'E',
	  link: function(scope, element, attr) {
		 scope.$watch(attr.content, function() {
		   element.html($parse(attr.content)(scope));
		   $compile(element.contents())(scope);
		 }, true);
	  }
	}
	});

	app.directive('ngConfirmClick', [function(){
		return {
		  priority: -1,
		  restrict: 'A',
		  link: function(scope, element, attrs){
			element.bind('click', function(e){
			  var message = attrs.ngConfirmClick;
			  if(message && !confirm(message)){
			    e.stopImmediatePropagation();
			    e.preventDefault();
			  }
			});
		  }
		}
	}]);

	app.directive('dannyPackery', ['$rootScope', function($rootScope) {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				if($rootScope.packery === undefined || $rootScope.packery === null){
					console.log('making packery!');
					$rootScope.packery = new Packery(element[0].parentElement, {columnWidth: '.item'});
					$rootScope.packery.bindResize();
					$rootScope.packery.appended(element[0]);
					$rootScope.packery.items.splice(1,1); // hack to fix a bug where the first element was added twice in two different positions
				}
				else{
					$rootScope.packery.appended(element[0]);
				}
				$rootScope.packery.layout();
			}
		};
	
	}]);

	app.directive('ngClic', ['$document', clickOutside]);
	function clickOutside($document) {
		return {
			restrict: 'A',
			scope: {
			    clickOutside: '&'
			},
			link: function ($scope, elem, attr) {
			    var classList = (attr.outsideIfNot !== undefined) ? attr.outsideIfNot.replace(', ', ',').split(',') : [];
			    if (attr.id !== undefined) classList.push(attr.id);

			    $document.on('click', function (e) {
			        var i = 0,
			            element;

			        if (!e.target) return;

			        for (element = e.target; element; element = element.parentNode) {
			            var id = element.id;
			            var classNames = element.className;

			            if (id !== undefined) {
			                for (i = 0; i < classList.length; i++) {
			                    if (id.indexOf(classList[i]) > -1 || classNames.indexOf(classList[i]) > -1) {
			                        return;
			                    }
			                }
			            }
			        }

			        $scope.$eval($scope.clickOutside);
			    });
			}
		};
	}

})();
