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
     * @requires lodash.f9-angular-scrabble._
     * @requires components.Word
     */
    angular.module('ScrabbleService', ['dataApi'])

        .service('ScrabbleService', scrabbleService);


    /**
     * @ngdoc method
     * @name scrabbleService
     * @methodOf scrabble.ScrabbleService
     * @description The Constructor <br>
     *  Data from: {@link https://github.com/hanshuebner/html-scrabble/blob/master/client/javascript/scrabble.js/ html-scrabble}
     * @requires lodash.f9-angular-scrabble._
     */
    function scrabbleService($log, dataApi, _) {

        var service = {};

        service.language = 'English';

        /**
         * @ngdoc method
         * @name getDictionary
         * @description
         * Instantiates the dictionary
         * Gets the data from: {@link api.dataApi dataApi}
         * @methodOf scrabble.ScrabbleService
         * @returns {Promise} Returns a promise the result of the $http GET
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

        service.letterBagIsEmpty = _letterBagIsEmpty;

        service.getTileScore = _getTileScore;

        service.getWordScore = _getWordScore;

        service.findBestWord = _findBestWord;

        service.getHand = _getHand;

        service.createTile = _createTile;

        service.shake = _shake;

        service.Word = Word;


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


        // == MAP OF FUNCTIONS ========


        /**
         * @ngdoc method
         * @name createLetterBag
         * @methodOf scrabble.ScrabbleService
         * @description Creates a complete set of Scrabble Tiles <br>
         * See: {@link components.Tile Tile}
         */
        function _createLetterBag() {
            service.letterBag = {};

            service.letterBag.tiles = [];

            var tile;

            var test = false; // make the bag smaller so we can investigate the no tiles state

            var i = (test) ? 5 : (letterDistribution.length);

            while (i--) {
                var letterDefinition = letterDistribution[i];

                tile = new Tile(letterDefinition.letter || " ", letterDefinition.score);
                if (letterDefinition.letter) {
                    service.letterBag.legalLetters += letterDefinition.letter;
                }

                var count = test ? 1 : letterDefinition.count;

                while (count--) {
                    tile = new Tile(letterDefinition.letter || " ", letterDefinition.score);
                    service.letterBag.tiles.push(tile);
                }
            }

            return service.letterBag;
        }

        /**
         * @ngdoc method
         * @name letterBagIsEmpty
         * @methodOf scrabble.ScrabbleService
         * @description Simply returns true if there are no letters in the bag, or the bag does not yet exist
         * @returns {boolean} true if empty
         * @private
         */
        function _letterBagIsEmpty() {
            return (service.letterBag && service.letterBag.tiles) ? (!service.letterBag.tiles.length) : (true);
        }


        /**
         * @ngdoc method
         * @name getHand
         * @methodOf scrabble.ScrabbleService
         * @description Returns a set of Tiles from the collection. <br> If there are less Tiles than requested in the collection, will return all the remaining tiles. <br> It will be the responsibility of another Actor to deal with an empty collection.
         * @param {number} number The number of Tiles to pick
         * @returns {Array} An array of type Tile
         */
        function _getHand(number) {
            var hand = [];
            while (number-- && service.letterBag.tiles.length) {
                hand.push(service.letterBag.tiles.pop());
            }
            return hand;
        }

        /**
         * @ngdoc method
         * @name getTileScore
         * @methodOf scrabble.ScrabbleService
         * @description Returns the Scrabble score for the supplied letter
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


        /**
         * @ngdoc method
         * @name getWordScore
         * @methodOf scrabble.ScrabbleService
         * @description Returns the aggregated score of each letter of the supplied word <br>
         * @param {string} word A word
         * @returns {number} The word's score in Scrabble
         * @private
         */
        function _getWordScore(word) {
            return word.split('')
                .map(function(letter) {
                    return _getTileScore(letter);
                })
                .reduce(function(a, b) {
                    return a + b;
                });
        }

        /**
         * @ngdoc method
         * @name _findBestWord
         * @methodOf scrabble.ScrabbleService
         * @description Finds the highest scoring words within the supplied collection<br>
         * @param {Array} words The collection to search
         * @returns {Array} The collection of words with the highest score
         */
        function _findBestWord(words) {

            var word,
                bestWords = [],
                bestScore = 0,
                a, b,
                debug = false;

            if (debug) {
                a = performance.now();
            }

            var i = words.length;

            while (i--) {
                word = new Word(words[i], service.getWordScore(words[i]));
                if (word.score >= bestScore) {
                    bestScore = word.score;
                    bestWords.push(word);
                }
            }
            // we have pushed all the previous best words into the array!
            // so run through the array and just get the best!
            bestWords = bestWords
                .filter(function(word) {
                    return word.score >= bestScore;
                });

            // let the GameService set the Bingo score

            if (debug) {
                b = performance.now();

                $log.info('best word: ', bestWords);

                $log.info('ScrabbleService.findBestWord() took ' + (b - a) + ' ms.');
            }

            return bestWords;
        }


        // Finds and returns a Tile Object with the supplied letter
        function _createTile(letter) {
            return _.find(letterDistribution, function(tile) {
                return tile.letter === letter;
            });
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
