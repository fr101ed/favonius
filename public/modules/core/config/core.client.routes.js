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
            		controller: 'ArticlesController',
            		controllerAs: 'vm',
            		templateUrl: 'modules/articles/views/list-articles.client.view.html'
            	}
            }
            ];

	}
	
})();