(function () {
    'use strict';

    // Setting up route
    angular
        .module('app.articles')
        .run(appRun);

    // appRun.$inject = ['$stateProvider'];

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'listArticles',
                config: {
                    url: '/articles',
                    controller: 'ArticlesController',
                    controllerAs: 'vm',
                    templateUrl: '/modules/articles/views/list-articles.client.view.html'
                }
            },
            {
                state: 'createArticle',
                config: {
                    url: '/articles/create',
                    controller: 'ArticlesController',
                    controllerAs: 'vm',
                    templateUrl: '/modules/articles/views/create-article.client.view.html'
                }
            },
            {
                state: 'viewArticle',
                config: {
                    url: '/articles/:articleId',
                    controller: 'ArticlesController',
                    controllerAs: 'vm',
                    templateUrl: '/modules/articles/views/view-article.client.view.html'
                }
            },
            {
                state: 'editArticle',
                config: {
                    url: '/articles/:articleId/edit',
                    controller: 'ArticlesController',
                    controllerAs: 'vm',
                    templateUrl: '/modules/articles/views/edit-article.client.view.html'
                }
            },
        ];
    }

})();