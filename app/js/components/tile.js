// == GLOBAL TILE OBJECT ========

'use strict';

/**
 * @ngdoc object
 * @name components.Tile
 * @description A Class which holds a Letter and Score properties
 * @param {string} letter The Tiles letter A-Z
 * @param {number} score The Scrabble score for the Letter
 * @constructor
 */
function Tile(letter, score) {
    this.letter = letter;
    this.score = score;
    this.drag = true;
}
