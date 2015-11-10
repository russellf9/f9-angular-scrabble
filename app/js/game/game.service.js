(function() {
    'use strict';


    /**
     * @name game.GameService
     * @ngdoc service
     * @description A Service for the Game Related operations
     * @requires scrabble.ScrabbleService
     */
    angular.module('GameService', ['ScrabbleService'])

    /**
     * @ngdoc object
     * @name game.rules
     * @param {number} BINGO THE number of tiles to use to achive the bingo score
     * @param {number} BINGO_SCORE The score when a player uses all seven tiles
     * @description
     *  A constant which holds 'Game values'
     * <pre>
     *  if (tiles.length === rules.BINGO) {
     *      score = score + rules.BINGO_SCORE;
     *  }
     * </pre>
     */
        .constant('rules', {
            'BINGO': 7,
            'BINGO_SCORE': 50
        })

        .service('GameService', GameService);


    /**
     * @ngdoc method
     * @name GameService
     * @methodOf game.GameService
     * @description The constructor
     * @constructor
     */
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

        service.replay = _replay;

        service.updateUserSelection = _updateUserSelection;

        service.evaluateDisplayUserScore = _evaluateDisplayUserScore;

        service.evaluateDisplayTimer = _evaluateDisplayTimer;

        service.evaluateIsDraggable = _evaluateIsDraggable;


        return service;


        /**
         * @ngdoc method
         * @name init
         * @methodOf game.GameService
         * @description Makes operations to initialise Scrabble <br>
         * • Sets up the letter bag
         * • Sets up the Dictionary
         * Returns a Promise to ensure the Callee that the required items will be ready
         * <pre>
         * GameService.init()
         *     .then(function() {
         *         _setUp();
         *     }, function(error) {
         *         $log.error('Init -> Error: ', error);
         *     });
         * </pre>
         */
        function _init() {

            var deferred = $q.defer();
            
            _setUpLetterBag();
            
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

        /**
         * @ngdoc method
         * @name setUpLetterBag
         * @methodOf game.GameService
         * @description Creates the letter bag
         * Also, randomises the order if the letters
         * @private
         */
        function _setUpLetterBag() {
            service.letterBag = ScrabbleService.createLetterBag();
            ScrabbleService.shake();
        }

        /**
         * @ngdoc method
         * @methodOf game.GameService
         * @name getHand
         * @description
            Removes a number of Tiles from the collection and returns them as an Array
         * @param {number} number The amount of Tiles to get
         * @returns {Array} an Array of Tiles
         * @private
         */
        function _getHand(number) {

            if(ScrabbleService.letterBagIsEmpty()) {
                // will have to set another State!
                // should have been spotted before!

                $log.info('getHand -> STATE ', StateMachineService.current());

                $log.info('GAME OVER!');

                return [];
            }
            number = number || 7;
            var hand = ScrabbleService.getHand(number);

            for (var i = 0, j = hand.length; i < j; i++) {
                flux.dispatch(actions.TILE_ADD, hand[i]);
            }
            service.currentHand = hand;
            return hand;
        }


        /**
         * @ngdoc method
         * @methodOf game.GameService
         * @name reset
         * @description Performs a variety of actions to reset the game
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

        // pauses the game (for when the user wants to stop the timer)
        // or the Timer has run out of Time
        function _stop() {

            $log.info('GameService stop');

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

            if(ScrabbleService.letterBagIsEmpty()) {
                // TODO we need another State
                $log.info('GAME OVER!');
                StateMachineService.end();
            } else {
                // sets state
                StateMachineService.finish();
            }

            // guard
            if (!service.currentHand) {
                $log.error('GameService.showBestWord | no currentHand');
                // TODO - have to handle this better
                return;
            }
            var result = _getResult(service.currentHand);

            var bestWord = ScrabbleService.findBestWord(result);

            // If no best word possible return 0 score
            var bestScore = bestWord ? _getScoreFromWord(bestWord) : 0;


            // TODO create a Class object?
            // {word:bestWord, score: bestScore}

            flux.dispatch(actions.BESTWORD_SET, {word: bestWord, score: bestScore});
        }


        /**
         * @ngdoc method
         * @name replay
         * @methodOf game.GameService
         * @description Sets up the required functions to reset the game
         * @private
         */
        function _replay() {
            $log.info('GameService.replay!');

            // need to create a new letter bag and shuffle it

            _setUpLetterBag();

            $log.info('replay -> STATE ', StateMachineService.current());

            _reset();
        }


        /**
         * @ngdoc method
         * @name updateUserSelection
         * @methodOf game.GameService
         * @description Performs the necessary operations once the user updates their selection of tiles
         * @param {array} tiles An Array of Tiles
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
        //
        /**
         * @description Returns the highest scoring word from the supplied set of tiles
         * @name _getResult
         * @param hand A set of Tiles
         * @returns {*} The Word with the highest possible scores
         * @private
         */
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
        function _getWord(tiles) {
            var word = tiles
                .map(function(tile) {
                    return tile.letter;
                })
                .reduce(function(a, b) {
                    return a + b;
                });
            return word;
        }


        /**
         * @description returns a collection of letter strings from the supplied set of tiles
         * @param tiles
         * @returns {Array}
         * @private
         */
        function _getLetters(tiles) {
            return tiles
                .map(function(tile) {
                    return tile.letter;
                });
        }

        // gets the total score from a given set of tiles
        function _getScore(tiles) {
            var score = tiles
                .map(function(tile) {
                    return tile.score;
                })
                .reduce(function(a, b) {
                    return a + b;
                });

            // check for bingo all letters being used
            if (tiles.length === rules.BINGO) {
                score = score + rules.BINGO_SCORE;
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

            // check if the maximum number of letters has been used
            if (letterArray.length === rules.BINGO) {
                score = score + rules.BINGO_SCORE;
                $log.info('BINGO!');
            }

            return score;
        }

        // evaluates if a word exists in the Dictionary

        /**
         *
         * @param word
         * @returns {boolean}
         * @private
         */
        function _wordExists(word) {
            if (typeof word === Array) {
                $log.info('Whoops I`m an array!');
            }
            return service.wordList.indexOf(word) >= 0;


        }
    }

})();
