(function() {

    'use strict';

    angular.module('f9-angular-scrabble')
        .controller('MainCtrl', mainController);

    function mainController($scope, $log, WordFinderService, _, DictionaryService, ScrabbleService) {

        // do a very quick hack to test here...
        $log.info('MainCtrl');

        var hand = ["E", "A", "T"];

        var letterBag = ScrabbleService.createLetterBag();

        $log.info('letterBag: ', letterBag);

        ScrabbleService.shake();

        $log.info('letterBag: ', ScrabbleService.letterBag);

        // an array of Tiles
        var hand = ScrabbleService.getHand(7);

        console.log('hand: ', hand);

        // get the letters from the hand
        //

        var letters = [];

        var tile;


        for(var i = 0; i < hand.length; i++) {
            tile = hand[i];
            console.log('tile: ', tile);
            letters.push(tile.letter);
        }


        // test the tile value
        var value = ScrabbleService.getTileScore('E');

        $log.info('The value if E is: ', value);


        value = ScrabbleService.getTileScore('X');

        $log.info('The value if X is: ', value);




        var score = ScrabbleService.getWordScore('ANT');

        $log.info('ANT is worth ',score);

        score = ScrabbleService.getWordScore('ZIT');

        $log.info('ZIT is worth ',score);

        // The highest scoring word is VAUNTIE  with a score of  10

        score = ScrabbleService.getWordScore('VAUNTIE');

        $log.info('VAUNTIE is worth ',score);

        DictionaryService.getDictionary()
            .then(function() {
                $scope.wordList = DictionaryService.dictionary;
                _makeWords();
            });


        function _makeWords() {

            var result = WordFinderService.makeWordFinder(letters, $scope.wordList);

            $log.info('21:06 - OK result: ', result);

            var bestWord = ScrabbleService.findBestWord(result);

            $log.info('The highest scoring word is ', bestWord.word, ' with a score of ', bestWord.score)


        }


    }
})();
