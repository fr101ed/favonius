(function() {
	'use strict';

	angular
		.module('app.core')
		.controller('HeaderController', HeaderController);

	HeaderController.$inject = ['$scope', '$timeout', 'Authentication', 'Menus', 'logger'];

	/* @ngInject */
	function HeaderController($scope, $timeout, Authentication, Menus, logger) {
		var vm = this;

        vm.authentication = Authentication;
        vm.isOpen = false;
        vm.isAnimating = false;
        vm.toggleMenu = toggleMenu;
        logger.success('welcome!');
        var morphEl = document.getElementById( 'morph-shape' ),
        	s = Snap( morphEl.querySelector( 'svg' ) ),
        	path = s.select( 'path' ),
        	initialPath = path.attr('d'),
        	steps = morphEl.getAttribute( 'data-morph-open' ).split(';'),
        	stepsTotal = steps.length;
        
        /*$scope.$on('$stateChangeSuccess', function() {
            vm.isOpen = false;
        });*/

        function toggleMenu() {
            if( vm.isAnimating )
                return false;
            vm.isAnimating = true;
            if( vm.isOpen ) {
                vm.isOpen = false;
                var timer = $timeout( function() {
                    path.attr( 'd', initialPath );
                    vm.isAnimating = false;
                }, 300 );
                // $timeout.cancel(timer);
            }
            else {
                vm.isOpen = true;
                var pos = 0,
                    nextStep = function( pos ) {
                        if( pos > stepsTotal - 1 ) {
                            vm.isAnimating = false; 
                            return;
                        }
                        path.animate( { 'path' : steps[pos] }, pos === 0 ? 400 : 500, pos === 0 ? mina.easein : mina.elastic, function() { nextStep(pos); } );
                        pos++;
                    };
                nextStep(pos);
            }
        }

        /*var docElem = document.documentElement,
            header = document.querySelector( '.codrops-header' ),
            didScroll = false,
            changeHeaderOn = 300;

        function init() {
            window.addEventListener( 'scroll', function( event ) {
                if( !didScroll ) {
                    didScroll = true;
                    setTimeout( scrollPage, 250 );
                }
            }, false );
        }

        function scrollPage() {
            var sy = scrollY();
            if ( sy >= changeHeaderOn ) {
                classie.add( header, 'codrops-header-shrink' );
            }
            else {
                classie.remove( header, 'codrops-header-shrink' );
            }
            didScroll = false;
        }

        function scrollY() {
            return window.pageYOffset || docElem.scrollTop;
        }*/

	}
	
})();