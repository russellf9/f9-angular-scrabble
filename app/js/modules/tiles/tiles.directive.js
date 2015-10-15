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
            controllerAs: 'dragDrop',
            bindToController: true, // because the scope is isolated
            template: $templateCache.get('modules/tiles/tiles.html'),
            link: tilesLink
        };

        function TilesController($scope, $log, StateMachineService, MyStore) {


            // '...is not needed when the function is named using UpperCasing, as this convention means it is a constructor function, which is what a controller is in Angular...'
            var dragDrop = this;


            dragDrop.stateData = StateMachineService.data;

            dragDrop.state = dragDrop.stateData.state;

            $log.info('Tiles setting up Store event!');

            dragDrop.tiles = MyStore.tiles;


            $scope.$listenTo(MyStore, 'tile.*', function () {
                $log.info('tile.add');
                dragDrop.tiles = MyStore.tiles;

                // set the list of drag and drop items here...
                dragDrop.dragItems = angular.copy(dragDrop.tiles);

                dragDrop.dropItems = [];
            });


            dragDrop.currentDragItem = undefined;


            // drag functions
            dragDrop.startCallback = function(event, obj, tile, index) {
                dragDrop.currentDragItem = tile;
            };

            dragDrop.overCallback = function(event) {
                $log.info('dragDrop.overCallback: ', arguments);
            };

            dragDrop.dragCallback = function(event, obj, tile, index) {
               $log.info('** dragDrop.onDrag | tile: ', tile);
            };

            dragDrop.stopCallback = function(event, obj, tile, index) {
               $log.info('** dragDrop.onStop | tile: ', tile);
            };

            dragDrop.outCallback = function(event) {
            };


            // drop functions
            dragDrop.dropCallback = function(event, obj, tile, index) {
                $log.info('A dragDrop.dropCallback| args: ', arguments);
                //$log.info('B dragDrop.dropCallback| tile: ', tile);
                //$log.info('B dragDrop.dropCallback| currentDragItem: ', dragDrop.currentDragItem);

            };

        }

        // link function (currently unused)
        function tilesLink() {
        }
    }
})();

