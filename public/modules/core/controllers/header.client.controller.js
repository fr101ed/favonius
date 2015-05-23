(function() {
	'use strict';

	angular
		.module('app.core')
		.controller('HeaderController', HeaderController);

	HeaderController.$inject = ['$scope', 'Authentication', 'Menus'];

	/* @ngInject */
	function HeaderController($scope, Authentication, Menus) {
		var vm = this;

		vm.authentication = Authentication;
		vm.isCollapsed = false;
		vm.menu = Menus.getMenu('topbar');

		vm.toggleCollapsibleMenu = function() {
			vm.isCollapsed = !vm.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			vm.isCollapsed = false;
		});
	}
	
})();