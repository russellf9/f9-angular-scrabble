(function() {
    'use strict';

    angular.module('ScrabbleService', ['dataApi'])

        .service('ScrabbleService', scrabbleService);


    /**
     * @name scrabbleService
     * @description A Service for Scrabble operations
     * @param dataApi
     * @param _ Lo-Dash Dependency
     * @returns {{}}
     */
    function scrabbleService($log, dataApi, _) {

        var service = {};

        service.language = 'English';

        // data from: https://github.com/hanshuebner/html-scrabble/blob/master/client/javascript/scrabble.js


        // instantiates the dictionary
        service.getDictionary = function() {
            return dataApi.getData()
                .success(function(result) {
                    service.dictionary = result.split(',');
                })
                .error(function(error) {
                    $log.error('Service error', error);
                });

        };

        // also, use the return to set a value
        service.createLetterBag = _createLetterBag;

        service.getTileScore = _getTileScore;

        service.getWordScore = _getWordScore;

        service.findBestWord = _findBestWord;

        service.getHand = _getHand;

        service.createTile = _createTile;

        service.shake = _shake;


        // == OBJECTS ========

        var letterDistribution =
            [{letter: "E", score: 1, count: 12},
                {letter: "A", score: 1, count: 9},
                {letter: "I", score: 1, count: 9},
                {letter: "O", score: 1, count: 8},
                {letter: "N", score: 1, count: 6},
                {letter: "R", score: 1, count: 6},
                {letter: "T", score: 1, count: 6},
                {letter: "L", score: 1, count: 4},
                {letter: "S", score: 1, count: 4},
                {letter: "U", score: 1, count: 4},

                {letter: "D", score: 2, count: 4},
                {letter: "G", score: 2, count: 3},

                {letter: "B", score: 3, count: 2},
                {letter: "C", score: 3, count: 2},
                {letter: "M", score: 3, count: 2},
                {letter: "P", score: 3, count: 2},

                {letter: "F", score: 4, count: 2},
                {letter: "H", score: 4, count: 2},
                {letter: "V", score: 4, count: 2},
                {letter: "W", score: 4, count: 2},
                {letter: "Y", score: 4, count: 2},

                {letter: "K", score: 5, count: 1},

                {letter: "J", score: 8, count: 1},
                {letter: "X", score: 8, count: 1},

                {letter: "Q", score: 10, count: 1},
                {letter: "Z", score: 10, count: 1}];


        return service;


        // == TILE OBJECT ========

        function Tile(letter, score) {
            this.letter = letter;
            this.score = score;
            this.drag = true;
        }


    // == MAP OF FUNCTIONS ========


        /**
         * @name _createLetterBag
         * @description Creates a complete set of Scrabble Tiles
         * @returns {Object}
         * @private
         */
        function _createLetterBag() {
            service.letterBag = {};

            service.letterBag.tiles = [];

            var tile;

            for (var i = 0; i < letterDistribution.length; ++i) {
                var letterDefinition = letterDistribution[i];

                tile = new Tile(letterDefinition.letter || " ", letterDefinition.score);
                if (letterDefinition.letter) {
                    service.letterBag.legalLetters += letterDefinition.letter;
                }

                for (var n = 0; n < letterDefinition.count; ++n) {
                    tile = new Tile(letterDefinition.letter || " ", letterDefinition.score);
                    service.letterBag.tiles.push(tile);
                }
            }

            return service.letterBag;
        }

        /**
         * @name _getHand
         * @description Returns an Array of Scrabble tiles
         * @param number The maximum number of tiles to pick
         * @returns {Array} An Array of type Tile
         * @private
         */
        function _getHand(number) {
            var hand = [];

            for (var i = 0; i < number; i++) {
                hand.push(service.letterBag.tiles.pop());
            }
            return hand;
        }

        /**
         * @name _getTileScore
         * @description Returns the value of the supplied letter
         * @param letter
         * @returns {Number}
         * @private
         */
        function _getTileScore(letter) {
            var tile = _.find(letterDistribution, function(tile) {
                return tile.letter === letter;
            });

            return tile.score;
        }

        /**
         * @name _getWordScore
         * @description Returns the total value of all the tiles in the supplied word
         * @param word
         * @returns {number}
         * @private
         */
        function _getWordScore(word) {
            var score = 0;
            for(var i = 0, j = word.length; i < j; i++) {
                score += service.getTileScore(word[i]);
            }
            return score;
        }

        /**
         * @name _findBestWord
         * @description Finds the word ( or words ) with the highest Scrabble score in the Supplied set
         * @param words
         * @returns {{word: string, score: number}}
         * @private
         */
        function _findBestWord(words) {
            var word,
                bestWord = '',
                bestScore = 0,
                score;

            for(var i = 0, j = words.length; i < j; i++) {
                word = words[i];
                score = service.getWordScore(word);
                if (score > bestScore) {
                    bestScore = score;
                    bestWord = word;
                    // TODO add repeats
                }
            }
            // TODO make new Object type?
            return {word:bestWord, score: bestScore};
        }


        // Finds and returns a Tile Object with the supllied letter
        function _createTile(letter) {
            var tile = _.find(letterDistribution, function(tile) {
                return tile.letter === letter;
            });
            return tile;
        }


        /**
         * @name _shake
         * @description Randomises the order of the tiles
         * @private
         */
        function _shake() {
            var count = service.letterBag.tiles.length;
            for (var i = 0; i < count * 3; i++) {
                var a = Math.floor(Math.random() * count);
                var b = Math.floor(Math.random() * count);
                var tmp = service.letterBag.tiles[b];
                service.letterBag.tiles[b] = service.letterBag.tiles[a];
                service.letterBag.tiles[a] = tmp;
            }
        }
    }
})();
