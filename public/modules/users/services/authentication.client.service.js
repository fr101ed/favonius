(function () {
    'use strict';

    // Authentication service for user variables
    angular
        .module('app.users')
        .factory('Authentication', Authentication);

    function Authentication() {
        var _user = this;

        this.user = window.user;

        var setUser = function(user) {
            // if (!user.roles) {
                // user.roles;
            // };
        }
        
        return {
            isAuthorized: function(role) {
                if (_user.user.hasOwnProperty('roles')) {
                    for (var i = 0; i < _user.user.roles.length; i++) {
                        if (_user.user.roles[i] == role)
                            return true;
                        else
                            return false;
                    };
                } else if (role == 'all') {
                    return true;
                } else
                    return false;
            },
            setUser: setUser,
            isLoggedIn: function() {
                return _user.user ? true : false;
            },
            getUser: function() {
                return _user.user;
            }
        };
    }

})();