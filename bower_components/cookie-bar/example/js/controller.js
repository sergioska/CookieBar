var appTest = angular.module('appTest', ['ui.bootstrap', 'CookieComponent']);

appTest.controller('TestController', function($scope) {
	$scope.cookie = false;
});
