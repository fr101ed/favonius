(function () {
    'use strict';

    // Users service used for communicating with the users REST endpoint
    angular
        .module('app.users')
        .factory('Users', Users);

    Users.$inject = ['$resource'];

    /* @ngInject */
    function Users($resource) {
        return $resource('users', {}, {
            update: {
                method: 'PUT'
            }
        });
    }

})();