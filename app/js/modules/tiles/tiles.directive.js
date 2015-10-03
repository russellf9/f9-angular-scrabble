(function() {
    'use strict';

    angular.module('f9tiles', [])

        .directive('f9Tiles', tiles);

    function tiles($templateCache) {
        return {
            restrict: 'AE',
            scope: {
            },
            controller: TilesController,
            controllerAs: 'vm',
            bindToController: true, // because the scope is isolated
            template: $templateCache.get('modules/tiles/tiles.html'),
            link: tilesLink
        };

        function TilesController($scope, $log, MyStore) {


            // '...is not needed when the function is named using UpperCasing, as this convention means it is a constructor function, which is what a controller is in Angular...'
            var vm = this;

            $log.info('Tiles setting up Store event!');
            vm.tiles = MyStore.tiles;


            $scope.$listenTo(MyStore, 'tile.*', function () {
                $log.info('tile.add');
                vm.tiles = MyStore.tiles;
            });
        }

        function tilesLink() {
        }
    }
})();

