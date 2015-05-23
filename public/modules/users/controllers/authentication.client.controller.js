(function () {
	'use strict';

	angular
		.module('app.users')
		.controller('AuthenticationController', AuthenticationController);


	AuthenticationController.$inject = ['$http', '$location', 'Authentication'];
	
	/* @ngInject */
	function AuthenticationController($http, $location, Authentication) {
		var vm = this;

		vm.authentication = Authentication;

		// If user is signed in then redirect back home
		if (vm.authentication.user)
			$location.path('/');

		vm.signup = function() {
			$http.post('/auth/signup', vm.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				vm.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				vm.error = response.message;
			});
		};

		vm.signin = function() {
			$http.post('/auth/signin', vm.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				vm.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				vm.error = response.message;
			});
		};
	}

})();