'use strict';

describe('CookieBar: ', function() {
	var scope, $rootScope, $compile;
	var elem, win, modal, cookies, log;
	beforeEach(module('templates'));
	beforeEach(module('ngCookies'));
	beforeEach(module('ui.bootstrap'));
	beforeEach(module('CookieComponent'));

	beforeEach(inject(function(_$rootScope_, _$compile_, $cookies) {
		$rootScope = _$rootScope_;
		$compile = _$compile_;
		// this is very important!!!
		scope = $rootScope;
		cookies = $cookies;

	}));

	describe('test cookie component', function() {

		var  html, element, controller;
		beforeEach(inject(function($controller) {

			controller = $controller('CookieController', 
										{	
											$scope: scope, 
											$element: elem, 
											$window: win, 
											$modal: modal, 
											$log: log, 
											$cookies: cookies, 
											sharedDataServiceCookie: {}
										} 
									);
			scope.$digest();

			html = angular.element('<cookie more-text="More information" close-text="Close" body-text="this site use cookies to ensure you get the best experience on our website."></cookie>');
			element = $compile(html)(scope);

			scope.model = "cookie";
			scope.init();
		}));

		it("test bar: (if cookie not exists show it)", function() {
			var ele = element.isolateScope();
			expect(scope.showCookieConsent()).toBe(true);
		});

		it("test bar: (if cookie exists don't show it)", function() {
			var ele = element.isolateScope();
			cookies.put('cookieConsent', 'y');
			expect(scope.showCookieConsent()).toBe(false);
		});



	});
});