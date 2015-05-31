(function () {
    'use strict';

    //Music service used for communicating with the music REST endpoints
    angular
        .module('app.music')
        .factory('MusicService', MusicService);

    MusicService.$inject = ['$resource'];

    /* @ngInject */
    function MusicService($resource) {
        return $resource('/music/:musicId', {
            musicId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
    
})();