(function() {
    'use strict';

    // Init the application configuration module for AngularJS application
    /*var ApplicationConfiguration = (function() {
        // Init module configuration options
        var applicationModuleName = 'app';
        var applicationModuleVendorDependencies = ['ngResource', 'ngCookies',  'ngAnimate',  'ngTouch',  'ngSanitize',  'ui.router', 'ui.bootstrap', 'ui.utils'];

        // Add a new vertical module
        var registerModule = function(moduleName, dependencies) {
            // Create angular module
            angular.module(moduleName, dependencies || []);

            // Add the module to the AngularJS configuration file
            angular.module(applicationModuleName).requires.push(moduleName);
        };

        return {
            applicationModuleName: applicationModuleName,
            applicationModuleVendorDependencies: applicationModuleVendorDependencies,
            registerModule: registerModule
        };
    })();*/
})();
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
(function() {
    'use strict';

    angular.module('app.articles', []);
})();
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
        /*
         * 3rd Party modules
         */
        'ui.router', 'ui.bootstrap', 'ui.utils'
    ]);
})();
(function() {
    'use strict';

    angular.module('app.users', []);
    
})();
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
    appRun.$inject = ["routerHelper"];

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
(function() {
	'use strict';

	// Setting up route
	angular
		.module('app.core')
		.run(appRun);

	// appRun.$inject = ['$stateProvider', '$urlRouterProvider'];
	
	/* @ngInject */
	function appRun(routerHelper) {
		routerHelper.configureStates(getStates(), '/');
    }
    appRun.$inject = ["routerHelper"];

    function getStates() {
        return [
            {
            	state: 'home',
            	config: {
            		url: '/',
            		controller: 'ArticlesController',
            		controllerAs: 'vm',
            		templateUrl: 'modules/articles/views/list-articles.client.view.html'
            	}
            }
            ];

	}
	
})();
(function() {
    'use strict';
    
    angular
        .module('app.core')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'Authentication'];
	
    /* @ngInject */
    function HomeController($scope, Authentication) {
        var vm = this;

		// This provides Authentication context.
		vm.authentication = Authentication;
	}
    
})();
(function() {
	'use strict';

	angular
		.module('app.core')
		.controller('HeaderController', HeaderController);

	HeaderController.$inject = ['$scope', '$timeout', 'Authentication', 'Menus'];

	/* @ngInject */
	function HeaderController($scope, $timeout, Authentication, Menus) {
		var vm = this;

        vm.isOpen = false;
        vm.isAnimating = false;
        vm.toggleMenu = toggleMenu;

        var morphEl = document.getElementById( 'morph-shape' ),
        	s = Snap( morphEl.querySelector( 'svg' ) ),
        	path = s.select( 'path' ),
        	initialPath = path.attr('d'),
        	steps = morphEl.getAttribute( 'data-morph-open' ).split(';'),
        	stepsTotal = steps.length;
        
        /*$scope.$on('$stateChangeSuccess', function() {
            vm.isOpen = false;
        });*/

        function toggleMenu() {
            if( vm.isAnimating )
                return false;
            vm.isAnimating = true;
            if( vm.isOpen ) {
                vm.isOpen = false;
                var timer = $timeout( function() {
                    path.attr( 'd', initialPath );
                    vm.isAnimating = false;
                }, 300 );
                // $timeout.cancel(timer);
            }
            else {
                vm.isOpen = true;
                var pos = 0,
                    nextStep = function( pos ) {
                        if( pos > stepsTotal - 1 ) {
                            vm.isAnimating = false; 
                            return;
                        }
                        path.animate( { 'path' : steps[pos] }, pos === 0 ? 400 : 500, pos === 0 ? mina.easein : mina.elastic, function() { nextStep(pos); } );
                        pos++;
                    };
                nextStep(pos);
            }
        }

        /*var docElem = document.documentElement,
            header = document.querySelector( '.codrops-header' ),
            didScroll = false,
            changeHeaderOn = 300;

        function init() {
            window.addEventListener( 'scroll', function( event ) {
                if( !didScroll ) {
                    didScroll = true;
                    setTimeout( scrollPage, 250 );
                }
            }, false );
        }

        function scrollPage() {
            var sy = scrollY();
            if ( sy >= changeHeaderOn ) {
                classie.add( header, 'codrops-header-shrink' );
            }
            else {
                classie.remove( header, 'codrops-header-shrink' );
            }
            didScroll = false;
        }

        function scrollY() {
            return window.pageYOffset || docElem.scrollTop;
        }*/

	}
	
})();
(function() {
	'use strict';

	//Menu service used for managing  menus
	angular
		.module('app.core')
		.service('Menus', Menus);

	function Menus() {
		// Define a set of default roles
		this.defaultRoles = ['*'];

		// Define the menus object
		this.menus = {};

		// A private function for rendering decision 
		var shouldRender = function(user) {
			if (user) {
				if (!!~this.roles.indexOf('*')) {
					return true;
				} else {
					for (var userRoleIndex in user.roles) {
						for (var roleIndex in this.roles) {
							if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
								return true;
							}
						}
					}
				}
			} else {
				return this.isPublic;
			}

			return false;
		};

		// Validate menu existance
		this.validateMenuExistance = function(menuId) {
			if (menuId && menuId.length) {
				if (this.menus[menuId]) {
					return true;
				} else {
					throw new Error('Menu does not exists');
				}
			} else {
				throw new Error('MenuId was not provided');
			}

			return false;
		};

		// Get the menu object by menu id
		this.getMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			return this.menus[menuId];
		};

		// Add new menu object by menu id
		this.addMenu = function(menuId, isPublic, roles) {
			// Create the new menu
			this.menus[menuId] = {
				isPublic: isPublic || false,
				roles: roles || this.defaultRoles,
				items: [],
				shouldRender: shouldRender
			};

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			delete this.menus[menuId];
		};

		// Add menu item object
		this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Push new menu item
			this.menus[menuId].items.push({
				title: menuItemTitle,
				link: menuItemURL,
				menuItemType: menuItemType || 'item',
				menuItemClass: menuItemType,
				uiRoute: menuItemUIRoute || ('/' + menuItemURL),
				isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].isPublic : isPublic),
				roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].roles : roles),
				position: position || 0,
				items: [],
				shouldRender: shouldRender
			});

			// Return the menu object
			return this.menus[menuId];
		};

		// Add submenu item object
		this.addSubMenuItem = function(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
					// Push new submenu item
					this.menus[menuId].items[itemIndex].items.push({
						title: menuItemTitle,
						link: menuItemURL,
						uiRoute: menuItemUIRoute || ('/' + menuItemURL),
						isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].items[itemIndex].isPublic : isPublic),
						roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : roles),
						position: position || 0,
						shouldRender: shouldRender
					});
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenuItem = function(menuId, menuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
					this.menus[menuId].items.splice(itemIndex, 1);
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeSubMenuItem = function(menuId, submenuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
					if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
						this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
					}
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		//Adding the topbar menu
		this.addMenu('topbar');
	}
	
})();
(function() {
    'use strict';

    angular
        .module('app.core')
        .provider('routerHelper', routerHelperProvider);

    routerHelperProvider.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
    
    /* @ngInject */
    function routerHelperProvider($locationProvider, $stateProvider, $urlRouterProvider) {
        /* jshint validthis:true */
        this.$get = RouterHelper;

        // $locationProvider.html5Mode(true);
        // $locationProvider.hashPrefix('!');

        RouterHelper.$inject = ['$state'];
        
        /* @ngInject */
        function RouterHelper($state) {
            var hasOtherwise = false;

            var service = {
                configureStates: configureStates,
                getStates: getStates
            };

            return service;

            ///////////////

            function configureStates(states, otherwisePath) {
                states.forEach(function(state) {
                    $stateProvider.state(state.state, state.config);
                });
                if (otherwisePath && !hasOtherwise) {
                    hasOtherwise = true;
                    $urlRouterProvider.otherwise(otherwisePath);
                }
            }

            function getStates() { return $state.get(); }
        }
    }

})();
(function () {
	'use strict';

	// Config HTTP Error Handling
	angular
		.module('app.users')
		.config(Configure);

	Configure.$inject = ['$httpProvider'];

	/* @ngInject */
	function Configure($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'Authentication',
			function($q, $location, Authentication) {
				return {
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								Authentication.user = null;

								// Redirect to signin page
								$location.path('signin');
								break;
							case 403:
								// Add unauthorized behaviour 
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);
	}
	
})();
(function () {
	'use strict';

	// Setting up route
	angular
		.module('app.users')
		.run(appRun);

	// appRun.$inject = ['$stateProvider'];

	/* @ngInject */
	function appRun(routerHelper) {
		routerHelper.configureStates(getStates());
	}
	appRun.$inject = ["routerHelper"];

	function getStates() {
		return [
			{
				state: 'profile',
                config: {
                    url: '/settings/profile',
                    controller: 'SettingsController',
                    controllerAs: 'vm',
                    templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
                }
			},
			{
				state: 'password',
				config: {
					url: '/settings/password',
					controller: 'SettingsController',
                    controllerAs: 'vm',
					templateUrl: 'modules/users/views/settings/change-password.client.view.html'
				}
			},
			{
				state: 'accounts',
				config: {
					url: '/settings/accounts',
					controller: 'SettingsController',
                    controllerAs: 'vm',
					templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
				}
			},
			{
				state: 'signup',
				config: {
					url: '/signup',
					controller: 'AuthenticationController',
                    controllerAs: 'vm',
					templateUrl: 'modules/users/views/authentication/signup.client.view.html'
				}
			},
			{
				state: 'signin',
				config: {
					url: '/signin',
					controller: 'AuthenticationController',
                    controllerAs: 'vm',
					templateUrl: 'modules/users/views/authentication/signin.client.view.html'
				}
			},
			{
				state: 'forgot',
				config: {
					url: '/password/forgot',
					controller: 'PasswordController',
					controllerAs: 'vm',
					templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
				}
			},
			{
				state: 'reset-invalid',
				config: {
					url: '/password/reset/invalid',
					controller: 'PasswordController',
					controllerAs: 'vm',
					templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
				}
			},
			{
				state: 'reset-success',
				config: {
					url: '/password/reset/success',
					controller: 'PasswordController',
					controllerAs: 'vm',
					templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
				}
			},
			{
				state: 'reset',
				config: {
					url: '/password/reset/:token',
					controller: 'PasswordController',
					controllerAs: 'vm',
					templateUrl: 'modules/users/views/password/reset-password.client.view.html'
				}
			}
		];
	}

})();
(function () {
	'use strict';

	angular
		.module('app.users')
		.controller('AuthenticationController', AuthenticationController);


	AuthenticationController.$inject = ['$http', '$location', 'Authentication'];
	
	/* @ngInject */
	function AuthenticationController($http, $location, Authentication) {
		var vm = this;

		vm.authentication = Authentication;

		// If user is signed in then redirect back home
		if (vm.authentication.user)
			$location.path('/');

		vm.signup = function() {
			$http.post('/auth/signup', vm.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				vm.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				vm.error = response.message;
			});
		};

		vm.signin = function() {
			$http.post('/auth/signin', vm.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				vm.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				vm.error = response.message;
			});
		};
	}

})();
(function (){
	'use strict';

	angular
		.module('app.users')
		.controller('PasswordController', PasswordController);

	PasswordController.$inject = ['$stateParams', '$http', '$location', 'Authentication'];
	
	/* @ngInject */
	function PasswordController($stateParams, $http, $location, Authentication) {
		var vm = this;
		vm.authentication = Authentication;

		//If user is signed in then redirect back home
		if (vm.authentication.user)
			$location.path('/');

		// Submit forgotten password account id
		vm.askForPasswordReset = function() {
			vm.success = vm.error = null;

			$http
				.post('/auth/forgot', vm.credentials)
				.success(function(response) {
					// Show user success message and clear form
					vm.credentials = null;
					vm.success = response.message;

				})
				.error(function(response) {
					// Show user error message and clear form
					vm.credentials = null;
					vm.error = response.message;
				});
		};

		// Change user password
		vm.resetUserPassword = function() {
			vm.success = vm.error = null;

			$http
				.post('/auth/reset/' + $stateParams.token, vm.passwordDetails)
				.success(function(response) {
					// If successful show success message and clear form
					vm.passwordDetails = null;

					// Attach user profile
					Authentication.user = response;

					// And redirect to the index page
					$location.path('/password/reset/success');
				})
				.error(function(response) {
					vm.error = response.message;
				});
		};
	}

})();
(function () {
	'use strict';

	angular
		.module('app.users')
		.controller('SettingsController', SettingsController);

	SettingsController.$inject = ['$scope', '$http', '$location', 'Users', 'Authentication'];
	
	/* @ngInject */
	function SettingsController($scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);

				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}

})();
(function () {
    'use strict';

    // Authentication service for user variables
    angular
        .module('app.users')
        .factory('Authentication', Authentication);

    function Authentication() {
        var _this = this;

        _this._data = {
            user: window.user
        };

        return _this._data;
    }

})();
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