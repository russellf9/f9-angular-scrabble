(function() {

    'use strict';

    angular.module('f9-angular-scrabble')
        .controller('MainCtrl', mainController);

    function mainController($scope, $log, WordFinderService, _) {
        $scope.data = {};
        $scope.loading = false;


        // do a very quick hack to test here...
        $log.info('MainCtrl');

        var wordList = ["EAT", "AT", "ATE", "TEA", "TEE", "TA"];

        var hand = ["E", "A", "T"];

        var result = WordFinderService.makeWordFinder(hand, wordList);

        $log.info('OK result: ', result);

    }
})();
