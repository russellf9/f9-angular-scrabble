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

        function TilesController($scope, $log, StateMachineService, GameService, MyStore) {


            // '...is not needed when the function is named using UpperCasing, as this convention means it is a constructor function, which is what a controller is in Angular...'
            var dragDrop = this;


            dragDrop.stateData = StateMachineService.data;

            dragDrop.state = dragDrop.stateData.state;

            $log.info('Tiles setting up Store event!');

            dragDrop.score = 0;

            dragDrop.tiles = MyStore.tiles;


            $scope.$listenTo(MyStore, 'tile.*', function () {
                $log.info('tile.add');
                dragDrop.tiles = MyStore.tiles;

                // set the list of drag and drop items here...
                dragDrop.dragItems = angular.copy(dragDrop.tiles);

                dragDrop.dropItems = [];
            });

            $scope.$listenTo(MyStore, 'score.*', function () {
                $log.info('FROM FLUX!!score');
                dragDrop.score = MyStore.userScore;
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
                _update();
            };


            // drop functions
            dragDrop.dropCallback = function(event, obj, tile, index) {
                _update();
            };

            function _update() {
                $log.info('update | dragDrop.dropItems: ', dragDrop.dropItems);

                GameService.calculateUserScore(dragDrop.dropItems);
            }

        }

        // link function (currently unused)
        function tilesLink() {
        }
    }
})();

