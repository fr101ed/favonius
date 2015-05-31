(function() {
    'use strict';

    // Use Applicaion configuration module to register a new module
    angular.module('app.core',[
        /*
         * Angular modules
         */
        'ngAnimate', 'ngSanitize', 'ngResource', 'ngCookies', 'ngTouch',
        /*
         * Our reusable cross app code modules
         */
        /*'blocks.exception', 'blocks.logger', 'blocks.router',*/
        'blocks.logger', 'blocks.router',
        /*
         * 3rd Party modules
         */
        'ui.router', 'ui.bootstrap', 'ui.utils'
    ]);
})();