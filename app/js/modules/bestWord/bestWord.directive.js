(function() {
    'use strict';

    angular.module('f9BestWord', [])

        .directive('f9BestWord', bestWord);

    function bestWord($templateCache) {
        return {
            restrict: 'AE',
            scope: {},
            controller: BestWordController,
            controllerAs: 'bestWord',
            bindToController: true, // because the scope is isolated
            template: $templateCache.get('modules/bestWord/best-word.html')
        };

        function BestWordController($scope, $log, StateMachineService, ScrabbleService, MyStore) {

            var bestWord = this;

            bestWord.stateData = StateMachineService.data;

            bestWord.state = bestWord.stateData.state;

            bestWord.tiles = [];

            // for the Best Word
            $scope.$listenTo(MyStore, 'bestword.*', function() {
                var tile;
                if (MyStore.bestWord) {
                    bestWord.best = MyStore.bestWord;
                    bestWord.wordArray = bestWord.best.word.split('');
                    bestWord.score = bestWord.best.score;
                    bestWord.tiles = _createTiles(bestWord.wordArray);
                } else {
                    bestWord.best = '';
                    bestWord.wordArray = [];
                    bestWord.score = 0;
                    bestWord.tiles = [];
                }
            });

            // Creates the collection of Tiles given an Array of letters
            function _createTiles(array) {
                var tiles = [];
                var tile;
                for (var i = 0, j = array.length; i < j; i++) {
                    tile = ScrabbleService.createTile(array[i]);
                    tiles.push(tile);
                }
                return tiles;
            }
        }
    }
})();
