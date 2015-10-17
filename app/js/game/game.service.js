(function() {
    'use strict';


    angular.module('GameService', ['ScrabbleService'])

        .service('GameService', GameService);

    function GameService($log, $q, flux, actions, StateMachineService, DictionaryService, ScrabbleService, WordFinderService, _) {

        $log.info('GameService');

        var service = {};

        service.letterBag = undefined;

        service.currentHand = undefined;

        service.isReady = false;

        service.init = _init;

        service.getLetterBag = _getLetterBag;

        service.getHand = _getHand;

        service.getResult = _getResult;

        service.reset = _reset;

        service.generate = _generate;

        service.start = _start;

        service.stop = _stop;

        service.showBestWord = _showBestWord;

        service.calculateUserScore = _calculateUserScore;


        return service;

        function _init() {


            var deferred = $q.defer();

            service.letterBag = ScrabbleService.createLetterBag();
            ScrabbleService.shake();

            DictionaryService.getDictionary()
                .then(function() {
                    service.wordList = DictionaryService.dictionary;
                    service.isReady = true;
                    deferred.resolve('OK');
                    StateMachineService.makeReady();

                    $log.info('STATE ', StateMachineService.current());
                }, function(error) {
                    deferred.reject('Error ' + error);
                });

            return deferred.promise;
        }

        function _getLetterBag() {
            return service.letterBag;
        }

        function _getHand(number) {

            $log.info('GET HAND!');

            number = number || 7;
            var hand = ScrabbleService.getHand(number);

            for (var i = 0, j = hand.length; i < j; i++) {
                flux.dispatch(actions.TILE_ADD, hand[i]);
            }
            service.currentHand = hand;
            return hand;
        }

        // TODO differentiate between the this 'getResult()` and result from the user's set of tiles
        function _getResult(hand) {

            $log.info('GET RESULT!');

            if (!hand || !hand.length) {
                $log.error('GameService.getResult - No Hand supplied!');
                return;
            }

            if (!service.wordList || !service.wordList.length) {
                $log.error('GameService.getResult - Dictionary has not been instantiated!');
                return;
            }

            var letters = [],
                tile;

            for (var i = 0; i < hand.length; i++) {
                tile = hand[i];
                letters.push(tile.letter);
            }
            return WordFinderService.makeWordFinder(letters, service.wordList);
        }

        function _generate() {
            var hand = service.getHand(7);
            var result = service.getResult(hand);
            var bestWord = ScrabbleService.findBestWord(result);

            flux.dispatch('setBestWord', bestWord);
        }

        function _reset() {

            $log.info('GET RESET!');
            StateMachineService.reset();
            $log.info('STATE ', StateMachineService.current());

            // clear the current hand
            // TODO might be unrequited if we stick to the model?
            service.currentHand = undefined;

            // clear the bestWord
            flux.dispatch(actions.BESTWORD_SET, '');

            // clear the tiles
            flux.dispatch(actions.TILE_DELETE);

            // TODO perhaps call when this has been confirmned
            StateMachineService.initialise();
            $log.info('STATE ', StateMachineService.current());
            StateMachineService.makeReady();
            $log.info('STATE ', StateMachineService.current());

        }

        // starts the game by staring the timer
        function _start() {

            $log.info('GET START!');

            StateMachineService.play();


            flux.dispatch(actions.TIMER_START);
        }

        // ends the game
        function _stop() {
            $log.info('GET STOP!');
            StateMachineService.stop();

            $log.info('STATE ', StateMachineService.current());
            flux.dispatch(actions.TIMER_STOP);
        }

        function _showBestWord() {

            $log.info('SHOW BEST WORD!');
            StateMachineService.finish();
            $log.info('STATE ', StateMachineService.current());


            if (!service.currentHand) {
                $log.error('GameService.showBestWord | no currentHand');
                return;
            }
            var result = service.getResult(service.currentHand);
            var bestWord = ScrabbleService.findBestWord(result);

            flux.dispatch('setBestWord', bestWord);

        }

        function _getLetters(hand) {
            var letters = [],
                tile;

            for (var i = 0; i < hand.length; i++) {
                tile = hand[i];
                letters.push(tile.letter);
            }
            return letters;
        }

        function _getWord(tiles) {
            var word = '',
                tile,
                letter;
            for (var i = 0, j = tiles.length; i < j; i++) {
                tile = tiles[i];

                word += tile.letter;
            }
            return word;
        }

        function _getScore(tiles) {
            var score = 0,
                tile;
            for (var i = 0, j = tiles.length; i < j; i++) {
                tile = tiles[i];
                score += tile.score;
            }
            return score
        }

        function _wordExists(word) {
            if (typeof word === Array) {
                $log.info('Woops I`m an array!');
            }
            return service.wordList.indexOf(word) >= 0;
        }

        function _calculateUserScore(tiles) {
            if (!tiles || !tiles.length) {
                $log.error('GameService.getResult - No Hand supplied!');
                return;
            }

            var word = _getWord(tiles)

            $log.info('Tiles: ', tiles, ' | word: ', word);

            var score = _getScore(tiles);

            // check is valid word
            var wordExists = _wordExists(word);

            // note dictionary does not include one letter words

            $log.info('That ', word, ' exists is ', wordExists);


            return wordExists ? score : 0;
        }
    }


})();
