(function () {
    'use strict';

    angular
        .module('app.music')
        .controller('MusicController', MusicController);

        MusicController.$inject = ['$stateParams', '$location', 'Authentication', 'MusicService'];
        
        /* @ngInject */
        function MusicController($stateParams, $location, Authentication, MusicService) {
            var vm = this;

            vm.authentication = Authentication;

            vm.create = create;
            vm.remove = remove;
            vm.update = update;
            vm.find = find;
            vm.findOne = findOne;

            function create() {
                var music = new MusicService({
                    title: vm.title,
                    content: vm.content
                });
                music.$save(function(response) {
                    $location.path('music/' + response._id);

                    vm.title = '';
                    vm.content = '';
                }, function(errorResponse) {
                    vm.error = errorResponse.data.message;
                });
            }

            function remove(music) {
                if (music) {
                    music.$remove();

                    for (var i in vm.music) {
                        if (vm.music[i] === music) {
                            vm.music.splice(i, 1);
                        }
                    }
                } else {
                    vm.music.$remove(function() {
                        $location.path('music');
                    });
                }
            }

            function update() {
                var music = vm.music;

                music.$update(function() {
                    $location.path('music/' + music._id);
                }, function(errorResponse) {
                    vm.error = errorResponse.data.message;
                });
            }

            function find() {
                vm.music = MusicService.query();
            }

            function findOne() {
                vm.music = MusicService.get({
                    musicId: $stateParams.musicId
                });
            }
        }

})();