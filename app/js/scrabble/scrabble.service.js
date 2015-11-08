(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name scrabble.ScrabbleService
     * @description A Service for Scrabble operations  <br><br>
     • Provides a dictionary of legal words  <br>
     • Provides the Scrabble letter distribution and the score for each letter <br>
     • Provides a `Letter Bag` of Scrabble Tiles  <br>
     • Provides a method to evaluate a word's score  <br>
     • Provides a method to evaluate the best possible word from a set of Tiles  <br>
     * @requires api.dataApi
     */
    angular.module('ScrabbleService', ['dataApi'])

        .service('ScrabbleService', scrabbleService);


    /**
     * @ngdoc method
     * @name scrabbleService
     * @methodOf scrabble.ScrabbleService
     * @description The Constructor <br>
     */
    function scrabbleService($log, dataApi, _) {

        var service = {};

        service.language = 'English';

        // data from: https://github.com/hanshuebner/html-scrabble/blob/master/client/javascript/scrabble.js


        /**
         * @ngdoc method
         * @name getDictionary
         * @description
         * Instantiates the dictionary
         * Gets the data from: {@link api.dataApi dataApi}
         * @methodOf scrabble.ScrabbleService
         * @returns {Promise} Returns a promise the result of the $http GET
         *
         */
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

        service.getLetterScore = _getLetterScore;

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

        /**
         * @ngdoc object
         * @name Tile
         * @description A Class which holds a Letter and Scrore properties
         * @param {string} letter The Tiles letter A-Z
         * @param {number} score The Scrabble score for the Letter
         * @constructor
         */
        function Tile(letter, score) {
            this.letter = letter;
            this.score = score;
            this.drag = true;
        }


        // == MAP OF FUNCTIONS ========


        /**
         * @ngdoc method
         * @name createLetterBag
         * @methodOf scrabble.ScrabbleService
         * @description Creates a complete set of Scrabble Tiles
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


        // TODO Evaluate action to perform when the letter bag has been depleted.
        /**
         * @ngdoc method
         * @name getHand
         * @methodOf scrabble.ScrabbleService
         * @description Returns a set of Tiles from the collection. <br> If there are less Tiles than requested in the collection I'm not sure what happens! (As the hand will be populated with undefined objects)
         * @param {number} number The number of Tiles to pick
         * @returns {array} An array of type Tile
         */
        function _getHand(number) {
            var hand = [];

            for (var i = 0; i < number; i++) {
                hand.push(service.letterBag.tiles.pop());
            }
            return hand;
        }

        /**
         * @ngdoc method
         * @name getTileScore
         * @methodOf scrabble.ScrabbleService
         * @param {string} letter The letter to evaluate
         * @returns {number} The letter's score
         * @private
         */
        function _getTileScore(letter) {
            var tile = _.find(letterDistribution, function(tile) {
                return tile.letter === letter;
            });

            return tile.score;
        }

        function _getLetterScore(letter) {
            return 1;
        }

        /**
         * @ngdoc method
         * @name getWordScore
         * @methodOf scrabble.ScrabbleService
         * @param {string} word A word
         * @returns {number} The word's score in Scrabble
         * @private
         */
        function _getWordScore(word) {
            var score = 0;
            // TODO use map/reduce
            for (var i = 0, j = word.length; i < j; i++) {
                score += _getTileScore(word[i]);
            }
            return score;
        }


        function _findBestWord(words) {
            var word,
                bestWord = '',
                bestScore = 0,
                score;

            for (var i = 0, j = words.length; i < j; i++) {
                word = words[i];
                score = service.getWordScore(word);
                if (score > bestScore) {
                    bestScore = score;
                    bestWord = word;
                    // TODO add repeats
                }
            }
            return bestWord;
            // TODO make new Object type?
            // return {word:bestWord, score: bestScore};
        }


        // Finds and returns a Tile Object with the supplied letter
        function _createTile(letter) {
            var tile = _.find(letterDistribution, function(tile) {
                return tile.letter === letter;
            });
            return tile;
        }


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
