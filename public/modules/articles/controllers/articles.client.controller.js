(function () {
    'use strict';

    angular
        .module('app.articles')
        .controller('ArticlesController', ArticlesController);

        ArticlesController.$inject = ['$stateParams', '$location', 'Authentication', 'ArticleService'];
        
        /* @ngInject */
        function ArticlesController($stateParams, $location, Authentication, ArticleService) {
            var vm = this;

            vm.authentication = Authentication;

            vm.create = create;
            vm.remove = remove;
            vm.update = update;
            vm.find = find;
            vm.findOne = findOne;

            function create() {
                var article = new ArticleService({
                    title: vm.title,
                    content: vm.content
                });
                article.$save(function(response) {
                    $location.path('articles/' + response._id);

                    vm.title = '';
                    vm.content = '';
                }, function(errorResponse) {
                    vm.error = errorResponse.data.message;
                });
            }

            function remove(article) {
                if (article) {
                    article.$remove();

                    for (var i in vm.articles) {
                        if (vm.articles[i] === article) {
                            vm.articles.splice(i, 1);
                        }
                    }
                } else {
                    vm.article.$remove(function() {
                        $location.path('articles');
                    });
                }
            }

            function update() {
                var article = vm.article;

                article.$update(function() {
                    $location.path('articles/' + article._id);
                }, function(errorResponse) {
                    vm.error = errorResponse.data.message;
                });
            }

            function find() {
                vm.articles = ArticleService.query();
            }

            function findOne() {
                vm.article = ArticleService.get({
                    articleId: $stateParams.articleId
                });
            }
        }

})();