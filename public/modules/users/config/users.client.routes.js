(function () {
	'use strict';

	// Setting up route
	angular
		.module('app.users')
		.run(appRun);

	// appRun.$inject = ['$stateProvider'];

	/* @ngInject */
	function appRun(routerHelper) {
		routerHelper.configureStates(getStates());
	}

	function getStates() {
		return [
			{
				state: 'profile',
                config: {
                    url: '/settings/profile',
                    controller: 'SettingsController',
                    controllerAs: 'vm',
                    templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
                }
			},
			{
				state: 'password',
				config: {
					url: '/settings/password',
					controller: 'SettingsController',
                    controllerAs: 'vm',
					templateUrl: 'modules/users/views/settings/change-password.client.view.html'
				}
			},
			{
				state: 'accounts',
				config: {
					url: '/settings/accounts',
					controller: 'SettingsController',
                    controllerAs: 'vm',
					templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
				}
			},
			{
				state: 'signup',
				config: {
					url: '/signup',
					controller: 'AuthenticationController',
                    controllerAs: 'vm',
					templateUrl: 'modules/users/views/authentication/signup.client.view.html'
				}
			},
			{
				state: 'signin',
				config: {
					url: '/signin',
					controller: 'AuthenticationController',
                    controllerAs: 'vm',
					templateUrl: 'modules/users/views/authentication/signin.client.view.html'
				}
			},
			{
				state: 'forgot',
				config: {
					url: '/password/forgot',
					controller: 'PasswordController',
					controllerAs: 'vm',
					templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
				}
			},
			{
				state: 'reset-invalid',
				config: {
					url: '/password/reset/invalid',
					controller: 'PasswordController',
					controllerAs: 'vm',
					templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
				}
			},
			{
				state: 'reset-success',
				config: {
					url: '/password/reset/success',
					controller: 'PasswordController',
					controllerAs: 'vm',
					templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
				}
			},
			{
				state: 'reset',
				config: {
					url: '/password/reset/:token',
					controller: 'PasswordController',
					controllerAs: 'vm',
					templateUrl: 'modules/users/views/password/reset-password.client.view.html'
				}
			}
		];
	}

})();