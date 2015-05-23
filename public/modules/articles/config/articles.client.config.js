(function () {
    'use strict';

    // Configuring the Articles module
    angular
        .module('app.articles')
        .run(appRun);

    appRun.$inject = ['Menus'];

    /* @ngInject */
    function appRun(Menus) {
        // Set top bar menu items
        Menus.addMenuItem('topbar', 'Articles', 'articles', 'dropdown', '/articles(/create)?');
        Menus.addSubMenuItem('topbar', 'articles', 'List Articles', 'articles');
        Menus.addSubMenuItem('topbar', 'articles', 'New Article', 'articles/create');
    }

})();