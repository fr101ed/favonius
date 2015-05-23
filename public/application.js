(function() {
    'use strict';

    angular.module('app', [
        'app.core',
        'app.users',
        'app.articles',
    ]);
    
    // Setting HTML5 Location Mode
    angular.module('app').config(['$locationProvider',
        function($locationProvider) {
            $locationProvider.hashPrefix('!');
        }
    ]);

    //Then define the init function for starting up the application
    angular.element(document).ready(function() {
        //Fixing facebook bug with redirect
        if (window.location.hash === '#_=_') window.location.hash = '#!';

        //Then init the app
        angular.bootstrap(document, ['app']);
    });
})();