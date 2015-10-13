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

        function TilesController($scope, $log, MyStore) {


            // '...is not needed when the function is named using UpperCasing, as this convention means it is a constructor function, which is what a controller is in Angular...'
            var dragDrop = this;

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


            dragDrop.list5 = [
                { 'title': 'Item 1', 'drag': true },
                { 'title': 'Item 2', 'drag': true },
                { 'title': 'Item 3', 'drag': true },
                { 'title': 'Item 4', 'drag': true },
                { 'title': 'Item 5', 'drag': true },
                { 'title': 'Item 6', 'drag': true },
                { 'title': 'Item 7', 'drag': true },
                { 'title': 'Item 8', 'drag': true }
            ];

            dragDrop.list2 = [];

            dragDrop.list1 = {title: 'A'};
            dragDrop.list2 = {};


            // drag functions
            dragDrop.startCallback = function(event, obj, tile, index) {
                dragDrop.currentDragItem = tile;
            };

            dragDrop.overCallback = function(event) {
                $log.info('dragDrop.overCallback: ', arguments)
            };

            dragDrop.dragCallback = function(event, obj, tile, index) {
               $log.info('** dragDrop.onDrag | tile: ', tile)
            };

            dragDrop.stopCallback = function(event, obj, tile, index) {
               // $log.info('** dragDrop.onStop | tile: ', tile);
            };

            dragDrop.outCallback = function(event) {

            };


            // drop functions
            dragDrop.dropCallback = function(event, obj, tile, index) {
                $log.info('A dragDrop.dropCallback| tile: ', arguments);
                //$log.info('B dragDrop.dropCallback| tile: ', tile);
                //$log.info('B dragDrop.dropCallback| currentDragItem: ', dragDrop.currentDragItem);

                _showItems();

            };

            function _addToDropItems(item) {
                $log.info('add item: ', arguments)

                console.log('-(  adding... ', dragDrop.dropItems[0])

                dragDrop.dropItems.push(item);

                console.log('adding... ', dragDrop.dropItems.length)
            }


            function _showItems() {

                $log.info('------------- SHOW ITEMS ------------\n')

                $log.info('drag: ',dragDrop.dragItems);
                $log.info('drop: ', dragDrop.dropItems);

            }
        }



        function tilesLink() {
        }
    }
})();

