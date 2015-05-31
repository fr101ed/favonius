(function() {
	'use strict';

	// Setting up route
	angular
		.module('app.core')
		.run(appRun);

	// appRun.$inject = ['$stateProvider', '$urlRouterProvider'];
	
	/* @ngInject */
	function appRun(routerHelper) {
		routerHelper.configureStates(getStates(), '/');
    }

    function getStates() {
        return [
            {
            	state: 'home',
            	config: {
            		url: '/',
            		controller: 'HomeController',
            		controllerAs: 'vm',
            		templateUrl: 'modules/core/views/home.client.view.html',
                    access_level: 'all',
            	}
            }
            ];

	}
	
})();