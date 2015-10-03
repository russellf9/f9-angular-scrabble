(function() {

    'use strict';

    angular.module('f9-angular-scrabble')
        .controller('MainCtrl', mainController);

    function mainController($timeout, $scope, $log, WordFinderService, _, DictionaryService, ScrabbleService, MyStore, flux) {

        $timeout(_setUp, 100);

        function _setUp() {
            // do a very quick hack to test here...
            $log.info('MainCtrl');

            var hand = ["E", "A", "T"];

            var letterBag = ScrabbleService.createLetterBag();

            $log.info('letterBag: ', letterBag);

            ScrabbleService.shake();

            $log.info('letterBag: ', ScrabbleService.letterBag);

            // an array of Tiles
            hand = ScrabbleService.getHand(7);

            console.log('hand: ', hand);

            // set the model here
            for(var i = 0, j = hand.length;  i < j; i++) {
                $log.info('Dispatch!!!')
                flux.dispatch('addTile', hand[i]);
            }

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
                    _makeWords(letters);
                });

        }



        function _makeWords(letters) {

            var result = WordFinderService.makeWordFinder(letters, $scope.wordList);

            $log.info('21:06 - OK result: ', result);

            var bestWord = ScrabbleService.findBestWord(result);

            flux.dispatch('setBestWord', bestWord );

            $log.info('The highest scoring word is ', bestWord.word, ' with a score of ', bestWord.score);


        }


    }
})();
