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
                { 'title': 'A', 'drag': true },
                { 'title': 'B', 'drag': true },
                { 'title': 'C', 'drag': true },

                { 'title': 'D', 'drag': true },
                { 'title': 'E', 'drag': true },
                { 'title': 'F', 'drag': true },

                { 'title': 'G', 'drag': true },
                { 'title': 'H', 'drag': true }
            ];

            dragDrop.list2 = [,,, ,,, ,,];

            dragDrop.list3 = [];

            dragDrop.list1 = {title: 'A'};



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
               $log.info('** dragDrop.onStop | tile: ', tile);
            };

            dragDrop.outCallback = function(event) {

            };


            // drop functions
            dragDrop.dropCallback = function(event, obj, tile, index) {
                $log.info('A dragDrop.dropCallback| args: ', arguments);
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

                $log.info('------------- SHOW ITEMS ------------\n');

                $log.info('dragItems: ',dragDrop.dragItems);
                $log.info('dragItems: ',dragDrop.list3);
                //$log.info('drop: ', dragDrop.dropItems);

            }
        }



        function tilesLink() {
        }
    }
})();

