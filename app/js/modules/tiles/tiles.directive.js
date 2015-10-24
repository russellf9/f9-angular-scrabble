(function() {
    'use strict';

    angular.module('f9tiles', [])

        .directive('f9Tiles', tiles);

    function tiles($templateCache) {
        return {
            restrict: 'AE',
            scope: {},
            controller: TilesController,
            controllerAs: 'dragDrop',
            bindToController: true, // because the scope is isolated
            template: $templateCache.get('modules/tiles/tiles.html'),
            link: tilesLink
        };

        function TilesController($scope, $log, StateMachineService, GameService, MyStore) {

            var dragDrop = this;


            // == SET UP DEFAULT VALUES ========
            dragDrop.score = 0;

            dragDrop.tiles = [];

            dragDrop.currentDragItem = undefined;


            // == BIND THE STATE VALUE ========
            // bind the state to the value in the Service
            dragDrop.stateData = StateMachineService.data;
            dragDrop.state = dragDrop.stateData.state;


            // == REDIRECTION OF BUSINESS LOGIC ========

            // Evaluates when the users score should be shown
            dragDrop.scoreIsVisible = function() {
                return GameService.evaluateDisplayUserScore();
            };

            dragDrop.isDraggable = function() {
                return GameService.evaluateIsDraggable();
            };


            // == FLUX EVENT HANDLERS ========

            // updates to the letter tiles
            $scope.$listenTo(MyStore, 'tile.*', function() {
                $log.info('tile.add');
                dragDrop.tiles = MyStore.tiles;

                // set the list of drag and drop items here...
                dragDrop.dragItems = angular.copy(dragDrop.tiles);

                // clear the list of drop items each time
                dragDrop.dropItems = [];
            });

            // updates to the user's score
            $scope.$listenTo(MyStore, 'score.*', function() {
                dragDrop.score = MyStore.userScore;
            });


            // == DRAG AND DROP HANDLERS ========

            // drag functions
            dragDrop.startCallback = function(event, obj, tile, index) {
                // (currently not used)
                dragDrop.currentDragItem = tile;
            };
            dragDrop.overCallback = function(event) {
            };

            dragDrop.dragCallback = function(event) {
            };
            dragDrop.stopCallback = function(event) {
                dragDrop.currentDragItem = undefined;
            };

            // drop functions
            dragDrop.dropCallback = function(event) {
                _update();
            };

            dragDrop.outCallback = function(event) {
                _update();
            };

            // == SERVICE CALLS ========

            // updates the users selection
            function _update() {
                GameService.updateUserSelection(dragDrop.dropItems);
            }

        }

        // Directive link function (currently unused)
        function tilesLink() {
        }
    }
})();

