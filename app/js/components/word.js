// == GLOBAL WORD OBJECT ========

'use strict';

/**
 * @ngdoc object
 * @name components.Word
 * @description An object containing a Scrabble word and it's score
 * @param {string} word A valid word
 * @param {number} score The words scrabble score
 * @constructor
 */
function Word (word, score) {
    this.word = word;
    this.score = score;
}
