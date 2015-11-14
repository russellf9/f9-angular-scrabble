(function() {
    'use strict';


    /**
     * @ngdoc service
     * @name scrabblewords.Scrabble:WordFinderService
     * @description
     * A Service responsible for finding the possible words <br>
     * Uses Underscore
     */
    angular.module('Scrabble', [])

        .service('WordFinderService', wordFinderService);

    /**
     * @ngdoc method
     * @name wordFinderService
     * @methodOf scrabblewords.Scrabble:WordFinderService
     * @description
     * Initialises and returns a new WordFinderService
     * @param {object} _ The Lodash Service
     * @returns {object} WordFinderService The Service with it's method calls
     */
    function wordFinderService(_) {

        var service = {};

        service.makeWordFinder = _getWords;

        return service;
    }

    /**
     * @ngdoc method
     * @name _getWords
     * @methodOf scrabblewords.Scrabble:WordFinderService
     * @description
     * Finds the possible words from a selection of letters
     * @param {Array} hand A collection of letters
     * @param {Array} wordList A list of valid words
     * @example
        <pre>
        return WordFinderService.makeWordFinder(_getLetters(hand), service.wordList);
        </pre>
     */

    function _getWords(hand, wordList) {
        return makeWordFinder(hand, wordList).findWords().__wrapped__;
    }

    var makeWordFinder = function(hand, wordList) {
        return {
            wordHashTable: hashArray(wordList),
            handPermutations: getPermutations(hand),
            findWords: function() {
                var foundWords = [];
                for (var i = 0; i < this.handPermutations.length; i++) {
                    var testWord = this.handPermutations[i];
                    var bucket = this.wordHashTable[hashItem(testWord)];

                    if (bucket && bucket.indexOf(testWord) !== -1) {
                        foundWords.push(testWord);
                    }
                }
                return _(foundWords).uniq();
            }
        };
    };

    var getPermutations = function(array) {
        var result = [];
        for (var i = 0; i < array.length; i++) {
            var element = array[i];
            result.push([element]);

            var subPermutations = getPermutations(array.slice(0, i).concat(array.slice(i + 1)));
            for (var j = 0; j < subPermutations.length; j++) {
                result.push([element].concat(subPermutations[j]));
            }
        }
        for (var k = 0; k < result.length; k++) {
            result[k] = result[k].join('');
        }
        return result;
    };


    var hashArray = function(array) {
        var hashTable = [];
        for (var i = 0, len = array.length; i < len; i++) {
            var word = array[i];
            var hashCode = hashItem(word);
            if (hashTable[hashCode]) {
                hashTable[hashCode].push(word);
            } else {
                hashTable[hashCode] = [word];
            }
        }
        return hashTable;
    };

    var hashItem = function(str) {
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
            hash = (hash << 5) + hash + str.charCodeAt(i);
            hash = hash & hash; // Convert to 32bit integer
            hash = Math.abs(hash);
        }
        return hash % 20000;
    };
})();