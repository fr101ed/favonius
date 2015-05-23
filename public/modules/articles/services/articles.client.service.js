(function () {
    'use strict';

    //Articles service used for communicating with the articles REST endpoints
    angular
        .module('app.articles')
        .factory('ArticleService', ArticleService);

    ArticleService.$inject = ['$resource'];

    /* @ngInject */
    function ArticleService($resource) {
        return $resource('/articles/:articleId', {
            articleId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
    
})();