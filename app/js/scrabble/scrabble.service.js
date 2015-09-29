(function() {
    'use strict';

    angular.module('ScrabbleService', ['dataApi'])

        .service('ScrabbleService', scrabbleService);

    function scrabbleService(dataApi, _) {

        var service = {};

        var test = 'Russell';

        service.language = 'English';


        // data from: https://github.com/hanshuebner/html-scrabble/blob/master/client/javascript/scrabble.js


        // instantiates the dictionary
        service.getDictionary = function() {
            return dataApi.getData()
                .success(function(result) {
                    service.dictionary = result.split(',');
                })
                .error(function(error) {
                    // TODO
                });

        };

        service.getTileScore = function(letter) {
            var tile = _.find(letterDistribution, function(tile) {
                return tile.letter === letter;
            });

            return tile.score;
        };

        service.getWordScore = function(word) {
            var score = 0;
            for(var i = 0, j = word.length; i < j; i++) {
                score += service.getTileScore(word[i]);
            }
            return score;
        };

        service.findBestWord = function(words) {

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

            return {word:bestWord, score: bestScore}

        };

        service.createLetterBag = function() {

            service.letterBag = {};

            service.letterBag.tiles = [];

            console.log('ScrabbleService:: service: ', service);

            console.log('ScrabbleService::createLetterBag | letterDistribution: ', letterDistribution)


            for (var i = 0; i < letterDistribution.length; ++i) {
                var letterDefinition = letterDistribution[i];

                var tile = new Tile(letterDefinition.letter || " ", letterDefinition.score);
                if (letterDefinition.letter) {
                    service.letterBag.legalLetters += letterDefinition.letter;
                }

                for (var n = 0; n < letterDefinition.count; ++n) {
                    var tile = new Tile(letterDefinition.letter || " ", letterDefinition.score);
                    service.letterBag.tiles.push(tile);
                }
            }

            return service.letterBag;
        };

        service.getHand = function(number) {

            var hand = [];

            for (var i = 0; i < number; i++) {
                hand.push(service.letterBag.tiles.pop())
            }

            return hand;

        };

        // randomises the order of the tiles
        service.shake = function() {

            var count = service.letterBag.tiles.length;
            for (var i = 0; i < count * 3; i++) {
                var a = Math.floor(Math.random() * count);
                var b = Math.floor(Math.random() * count);
                var tmp = service.letterBag.tiles[b];
                service.letterBag.tiles[b] = service.letterBag.tiles[a];
                service.letterBag.tiles[a] = tmp;
            }
        };

        function Tile(letter, score) {
            this.letter = letter;
            this.score = score;
        }

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
                {letter: "Z", score: 10, count: 1}]


        return service;
    }


})();