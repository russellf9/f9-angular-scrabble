(function() {
    'use strict';


    angular.module('GameService', ['ScrabbleService'])

        .constant('rules', {
            'BINGO': 7,
            'BINGO_SCORE': 50
        })

        .service('GameService', GameService);

    function GameService($log, $q, flux, rules, actions, StateMachineService, DictionaryService, ScrabbleService, WordFinderService, _) {

        $log.info('GameService');

        var service = {};

        service.letterBag = undefined;

        service.currentHand = undefined;

        service.isReady = false;

        service.init = _init;

        service.getLetterBag = _getLetterBag;

        service.getHand = _getHand;

        service.reset = _reset;

        service.start = _start;

        service.stop = _stop;

        service.showBestWord = _showBestWord;

        service.updateUserSelection = _updateUserSelection;

        service.evaluateDisplayUserScore = _evaluateDisplayUserScore;

        service.evaluateDisplayTimer = _evaluateDisplayTimer;

        service.evaluateIsDraggable = _evaluateIsDraggable;


        return service;

        // returns a Promise, so we delay the ready state to when the data has been correctly got
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

        // == GETTERS ========

        // a collection of Tiles
        function _getLetterBag() {
            return service.letterBag;
        }

        // removes a number of tiles from the collection and returns them
        function _getHand(number) {
            number = number || 7;
            var hand = ScrabbleService.getHand(number);

            for (var i = 0, j = hand.length; i < j; i++) {
                flux.dispatch(actions.TILE_ADD, hand[i]);
            }
            service.currentHand = hand;
            return hand;
        }


        /**
         * @name _reset
         * @description Performs a variety of actions to reset the game
         * @private
         */
        function _reset() {

            $log.info('GET RESET!');
            StateMachineService.reset();
            $log.info('STATE ', StateMachineService.current());

            // clear the current hand
            // TODO might be un-required if we stick to the model?
            service.currentHand = undefined;

            // clear the user's score
            flux.dispatch(actions.SCORE_UPDATE, 0);

            // clear the bestWord
            flux.dispatch(actions.BESTWORD_SET, '');

            // clear the tiles
            flux.dispatch(actions.TILE_DELETE);

            // TODO perhaps call when this has been confirmed
            StateMachineService.initialise();

            StateMachineService.makeReady();
        }

        // starts the game by staring the timer
        function _start() {
            StateMachineService.play();

            flux.dispatch(actions.TIMER_START);
        }

        // ends the game
        function _stop() {
            StateMachineService.stop();

            flux.dispatch(actions.TIMER_STOP);
        }

        // TODO Rename as we have a side-effect
        /**
         * @name _showBestWord
         * @description Finds the word with the highest score
         * @private
         */
        function _showBestWord() {

            // sets state
            StateMachineService.finish();

            // guard
            if (!service.currentHand) {
                $log.error('GameService.showBestWord | no currentHand');
                return;
            }
            var result = _getResult(service.currentHand);

            var bestWord = ScrabbleService.findBestWord(result);


            var bestScore = _getScoreFromWord(bestWord);


            // create a type object
            // {word:bestWord, score: bestScore}

            flux.dispatch(actions.BESTWORD_SET, {word: bestWord, score: bestScore});

        }


        /**
         * @name _updateUserSelection
         * @description Performs the necessary operations once the user updatets their selection of tiles
         * @param tiles
         * @private
         */
        function _updateUserSelection(tiles) {
            if (!tiles || !tiles.length) {
                flux.dispatch(actions.SCORE_UPDATE, 0);
                return;
            }

            // Note: dictionary does not include one letter words
            var word = _getWord(tiles);

            // check is valid word and evaluate the score
            var score = _wordExists(word) ? _getScore(tiles) : 0;

            flux.dispatch(actions.SCORE_UPDATE, score);
        }

        // == BUSINESS LOGIC ========

        // Evaluates if the user's score field should be visible
        function _evaluateDisplayUserScore() {
            return (StateMachineService.current() === 'playing' || StateMachineService.current() === 'done' || StateMachineService.current().state === 'paused' || StateMachineService.current() === 'paused' );
        }

        // The timer should only be visible when the user is playing the game or has just stopped
        function _evaluateDisplayTimer() {
            return !(StateMachineService.current() === 'ready' || StateMachineService.current() === 'initial' || StateMachineService.current() === 'done');
        }

        // The tiles should onle be draggable when the user is playing the game
        function _evaluateIsDraggable() {
            return StateMachineService.current() === 'playing';
        }

        // == UTILITY FUNCTIONS ========


        // TODO differentiate between the this 'getResult()` and result from the user's set of tiles
        // Returns the highest scoring word from the supplied set of tiles
        function _getResult(hand) {

            if (!hand || !hand.length) {
                $log.error('GameService.getResult - No Hand supplied!');
                return;
            }

            if (!service.wordList || !service.wordList.length) {
                $log.error('GameService.getResult - Dictionary has not been instantiated!');
                return;
            }

            return WordFinderService.makeWordFinder(_getLetters(hand), service.wordList);
        }

        // gets the word as a String from a given set of tiles
        // TODO use reduce function
        // TODO use Tile object
        function _getWord(tiles) {
            var word = '',
                tile;
            for (var i = 0, j = tiles.length; i < j; i++) {
                tile = tiles[i];
                word += tile.letter;
            }
            return word;
        }

        /**
         * @description returns a collection of letter strings from the suppied set of tiles
         * @param tiles
         * @returns {Array}
         * @private
         */
        function _getLetters(tiles) {
            var letters = [],
                tile;

            for (var i = 0; i < tiles.length; i++) {
                tile = tiles[i];
                letters.push(tile.letter);
            }
            return letters;
        }

        // gets the total score from a given set of tiles
        // TODO use reduce function
        // TODO use Tile object
        function _getScore(tiles) {
            var score = 0,
                tile;
            for (var i = 0, j = tiles.length; i < j; i++) {
                tile = tiles[i];
                score += tile.score;
            }
            // check for bingo all letters being used
            if (tiles.length === rules.BINGO) {
                score = score + rules.BINGO_SCORE;
                $log.info('BINGO!');
            }
            return score;
        }

        // gets the total score from a given word
        function _getScoreFromWord(word) {

            // create an array
            var letterArray = word.split('');

            // Nice! -  Use a map and a reduce function
            var score = letterArray
                .map(function(letter) {
                    return ScrabbleService.getTileScore(letter);
                })
                .reduce(function(a, b) {
                    return a + b;
                });

            // checki if all the maximum number of letters has been used
            if (letterArray.length === rules.BINGO) {
                score = score + rules.BINGO_SCORE;
                $log.info('BINGO!');
            }

            return score;
        }

        // evaluates if a word exists in the Dictionary
        function _wordExists(word) {
            if (typeof word === Array) {
                $log.info('Whoops I`m an array!');
            }
            return service.wordList.indexOf(word) >= 0;
        }
    }

})();
