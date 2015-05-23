(function() {
    'use strict';
    
    angular
        .module('app.core')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'Authentication'];
	
    /* @ngInject */
    function HomeController($scope, Authentication) {
        var vm = this;

		// This provides Authentication context.
		vm.authentication = Authentication;
	}
    
})();