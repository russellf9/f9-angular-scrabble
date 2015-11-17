(function() {
    'use strict';


    /**
     * @ngdoc directive
     * @name modules.bestWord:f9BestWord
     * @restrict 'AE'
     * @scope
     * @description
     * Responsible for displaying the Scrabble word with the highest score
     * @requires game.GameService
     * @requires scrabble.ScrabbleService
     * @requires fsm.StateMachineService
     */
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
                    console.log('C bestWord: ',bestWord.best);
                    bestWord.wordArray = MyStore.bestWord.word.split('');
                    bestWord.score = bestWord.score;
                    bestWord.tiles = _createTiles(bestWord.best);
                } else {
                    bestWord.best = '';
                    bestWord.wordArray = [];
                    bestWord.score = 0;
                    bestWord.tiles = [];
                }
            });

            /**
             * @ngdoc method
             * @name _createTiles
             * @methodOf modules.bestWord:f9BestWord
             * @description Creates a set of Tile objects from the supplied Word
             * @param {Word} word A word object
             * @returns {Array} An array of Tiles
             */
            function _createTiles(word) {

                // perform some type checking!
                if(word.constructor.name !== 'Word') {
                    $log.error('Supplied parameter is not a Word!');
                    return [];
                }

                $log.info('Word is an Object: ' , isObject2(word));
                $log.info('Word is Word: ' , isObject2(word));



                //$log.info('is a Word: ', (word instanceof Word))
                var array = word.word.split('');
                var tiles = [];
                var tile;
                // TODO use map/reduce
                for (var i = 0, j = array.length; i < j; i++) {
                    tile = ScrabbleService.createTile(array[i]);
                    tiles.push(tile);
                }
                return tiles;
            }

            function isObject2(x) {
                return x === Object(x);
            }
        }
    }
})();
