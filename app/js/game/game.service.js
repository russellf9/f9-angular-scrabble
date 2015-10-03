(function() {
    'use strict';


    angular.module('GameService', ['ScrabbleService'])

        .service('GameService', GameService);

    function GameService($log, $q, flux, DictionaryService, ScrabbleService, WordFinderService, _) {

        $log.info('GameService');

        var service = {};

        service.letterBag = undefined;

        service.isReady = false;

        service.init = _init;

        service.getLetterBag = _getLetterBag;

        service.getHand = _getHand;

        service.getResult = _getResult;

        service.generate = _generate;


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
                }, function(error) {
                    deferred.reject('Error ' + error);
                });

            return deferred.promise;
        }

        function _getLetterBag() {
            return service.letterBag;
        }

        function _getHand(number) {
            var hand = ScrabbleService.getHand(number);

            for (var i = 0, j = hand.length; i < j; i++) {
                flux.dispatch('addTile', hand[i]);
            }
            return hand;
        }

        function _getResult(hand) {

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

            for(var i = 0; i < hand.length; i++) {
                tile = hand[i];
                letters.push(tile.letter);
            }
            return WordFinderService.makeWordFinder(letters, service.wordList);
        }

        function _generate() {
            var hand =  service.getHand(7);
            var result = service.getResult(hand);
            var bestWord = ScrabbleService.findBestWord(result);

            flux.dispatch('setBestWord', bestWord );
        }
    }


})();
