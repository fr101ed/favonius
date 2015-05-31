(function () {
    'use strict';

    // Setting up route
    angular
        .module('app.music')
        .run(appRun);

    // appRun.$inject = ['$stateProvider'];

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'listMusic',
                config: {
                    url: '/music',
                    controller: 'MusicController',
                    controllerAs: 'vm',
                    templateUrl: '/modules/music/views/list-music.client.view.html'
                }
            },
            {
                state: 'createMusic',
                config: {
                    url: '/music/create',
                    controller: 'MusicController',
                    controllerAs: 'vm',
                    templateUrl: '/modules/music/views/create-music.client.view.html'
                }
            },
            {
                state: 'viewMusic',
                config: {
                    url: '/music/:musicId',
                    controller: 'MusicController',
                    controllerAs: 'vm',
                    templateUrl: '/modules/music/views/view-music.client.view.html'
                }
            },
            {
                state: 'editMusic',
                config: {
                    url: '/music/:musicId/edit',
                    controller: 'MusicController',
                    controllerAs: 'vm',
                    templateUrl: '/modules/music/views/edit-music.client.view.html'
                }
            },
        ];
    }

})();