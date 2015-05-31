(function() {
    'use strict';

    angular.module('app', [
        'app.core',
        'app.users',
        'app.articles',
        'app.music',
    ]);
    
    // Setting HTML5 Location Mode
    angular.module('app').config(['$locationProvider',
        function($locationProvider) {
            $locationProvider.hashPrefix('!');
        }
    ]);

    angular.module('app').run(function($rootScope, $location, logger, Authentication) {
        $rootScope.$on('$stateChangeStart', function(evt, next, curr) {
            if (next.url === curr.url || !curr.url)
                return;
            if (!Authentication.isAuthorized(next.access_level)) {
                if (Authentication.isLoggedIn()) {
                    logger.warning("Sorry, you have no access to this!");
                    $location.path('/');
                } else {
                    $location.path('/signin');
                };
            };
        });
    });

    //Then define the init function for starting up the application
    angular.element(document).ready(function() {
        //Fixing facebook bug with redirect
        if (window.location.hash === '#_=_') window.location.hash = '#!';

        //Then init the app
        angular.bootstrap(document, ['app']);
    });
})();