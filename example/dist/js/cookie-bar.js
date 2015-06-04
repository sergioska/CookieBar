var CookieComponent = angular.module('CookieComponent', ['ui.bootstrap', 'ngCookies']);
CookieComponent.factory('sharedDataServiceCookie', function($rootScope) {
		var sharedDataServiceCookie = {};
		sharedDataServiceCookie.prepForEmitPolicy = function() {
			$rootScope.$broadcast('handlePolicy');
		};
		return sharedDataServiceCookie;
});

CookieComponent.controller('CookieController', function($scope, $element, $window, $modal, $log, $cookies, sharedDataServiceCookie) {
	var content = $element;
	$scope.init = function() {
		$scope.cookieVar = false;
		$scope.scroll = false;
		$scope.click = false;
		if(!$scope.ngModel)
			ngModel = 0;
		console.log("SCROLL: " + $scope.withScroll);
		sharedDataServiceCookie.hasCookie = $scope.cookieVar;
		$scope.output = $scope.ngModel;

	};

	$scope.showCookieConsent = function() {
		if(typeof($cookies.get('cookieConsent'))=="undefined") {
			$scope.cookieVar = false;
			return true;
		} else {
			$scope.cookieVar = true;
			return false;
		}
	};

	$scope.$on('handlePolicy', function (event, args){
		/*jshint -W087 */
		//debugger;
		var size = {};
		var modalInstance = $modal.open({
			templateUrl: 'policyContent.html',
			controller: ModalInstancePolicyController,
			size: size,
			resolve: {
				Data: function () {
						return sharedDataServiceCookie.hasCookie;
					}
				}
		});

		modalInstance.result.then(function () {
	  
		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
		});    
	});

	$scope.getCookie = function() {
		if(typeof($cookies.get('cookieConsent'))=="undefined") 
			return false;
		return true;
		//return $scope.cookieVal;
	};


	$scope.openPolicyPanel = function() {
		/*jshint -W087 */
		//debugger;
		sharedDataServiceCookie.prepForEmitPolicy();
	};

	$scope.closePanel = function() {
		$cookies.put('cookieConsent', 'y');
		sharedDataServiceCookie.hasCookie = true;
		$element.hide();
	};

	// enable on scroll if with-scroll attr is true
	angular.element($window).bind('scroll', function(){
		if(!$scope.scroll) {
			$cookies.put('cookieConsent', 'y');
			sharedDataServiceCookie.hasCookie = true;
			$scope.scroll = true;
		}
	});

	// enable on click
	angular.element($window).bind('click', function(){
		if(!$scope.click) {
			$cookies.put('cookieConsent', 'y');
			sharedDataServiceCookie.hasCookie = true;
			$scope.click = true;
		}
	});

});

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.
var ModalInstancePolicyController = function ($scope, $modalInstance, $cookies, sharedDataServiceCookie) {

	$scope.close = function () {
		$cookies.put('cookieConsent', 'y');
		sharedDataServiceCookie.hasCookie = true;
		$modalInstance.dismiss();
	};


};

CookieComponent.directive('cookie', ['$document', '$cookies', 'sharedDataServiceCookie', function($document, $cookies, sharedDataServiceCookie) {
	return {
		require : '^?ngModel',
		restrict: 'E',
		replace: true,
		transclude: true,
		templateUrl: "dist/js/templates/cookiebar.html",
		scope: {color: "@", ngModel: "=", moreText: "@", closeText: "@", bodyText: "@", withScroll: "@"},
		controller: 'CookieController',
		link: function(scope, element, attr, ngModel) {
			scope.$watch(function(){
				if(typeof($cookies.get('cookieConsent'))!="undefined")
					sharedDataServiceCookie.hasCookie = true;
				if(sharedDataServiceCookie.hasCookie)
					ngModel.$setViewValue(sharedDataServiceCookie.hasCookie);
			});
		}
	};
}]);