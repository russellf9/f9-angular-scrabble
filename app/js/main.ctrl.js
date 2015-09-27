(function() {

    'use strict';

    angular.module('f9-angular-scrabble')
        .controller('MainCtrl', mainController);

    function mainController($scope, $log, WordFinderService, _, DictionaryService) {

        // do a very quick hack to test here...
        $log.info('MainCtrl');

        var hand = ["E", "A", "T"];

        DictionaryService.getDictionary()
            .then(function() {
                $scope.wordList = DictionaryService.dictionary;
                _makeWord();
            });


        function _makeWord() {

            var result = WordFinderService.makeWordFinder(hand, $scope.wordList);

            $log.info('21:06 - OK result: ', result);

        }


    }
})();
