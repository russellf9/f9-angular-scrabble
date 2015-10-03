(function() {
    'use strict';

    angular.module('f9tiles', [])

        .directive('f9Tiles', tiles);

    function tiles($templateCache) {
        return {
            restrict: 'AE',
            scope: {
            },
            controller: tilesController,
            controllerAs: 'vm',
            bindToController: true, // because the scope is isolated
            template: $templateCache.get('modules/tiles/tiles.html'),
            link: tilesLink
        };

        function tilesController($scope, $log, MyStore) {

            var vm = this;

            $log.info('Tiles setting up Store event!');
            vm.tiles = MyStore.tiles;

            $scope.$listenTo(MyStore, function () {
                vm.tiles = MyStore.tiles;
            });
        }

        function tilesLink() {
        }
    }
})();

