(function (){
	'use strict';

	angular
		.module('app.users')
		.controller('PasswordController', PasswordController);

	PasswordController.$inject = ['$stateParams', '$http', '$location', 'Authentication'];
	
	/* @ngInject */
	function PasswordController($stateParams, $http, $location, Authentication) {
		var vm = this;
		vm.authentication = Authentication;

		//If user is signed in then redirect back home
		if (vm.authentication.user)
			$location.path('/');

		// Submit forgotten password account id
		vm.askForPasswordReset = function() {
			vm.success = vm.error = null;

			$http
				.post('/auth/forgot', vm.credentials)
				.success(function(response) {
					// Show user success message and clear form
					vm.credentials = null;
					vm.success = response.message;

				})
				.error(function(response) {
					// Show user error message and clear form
					vm.credentials = null;
					vm.error = response.message;
				});
		};

		// Change user password
		vm.resetUserPassword = function() {
			vm.success = vm.error = null;

			$http
				.post('/auth/reset/' + $stateParams.token, vm.passwordDetails)
				.success(function(response) {
					// If successful show success message and clear form
					vm.passwordDetails = null;

					// Attach user profile
					Authentication.user = response;

					// And redirect to the index page
					$location.path('/password/reset/success');
				})
				.error(function(response) {
					vm.error = response.message;
				});
		};
	}

})();