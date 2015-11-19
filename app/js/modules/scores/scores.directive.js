(function() {
    'use strict';

    angular.module('f9Scores', [])

        .directive('f9Scores', scores);

    function scores($templateCache) {
        return {
            restrict: 'AE',
            scope: {
            },
            controller: ScoresController,
            controllerAs: 'scores',
            bindToController: true, // because the scope is isolated
            template: $templateCache.get('modules/scores/scores.html')
        };

        function ScoresController($scope, $log, StateMachineService,  GameService, MyStore) {

            $log.info('Hi from the Scores!');


            var scores = this;

            scores.stateData = StateMachineService.data;

            scores.state = scores.stateData.state;

            // == SET UP DEFAULT VALUES ========
            scores.userScore = 0;


            // == REDIRECTION OF BUSINESS LOGIC ========

            // Evaluates when the users score should be shown
            scores.scoreIsVisible = function() {
                return GameService.evaluateDisplayUserScore();
            };


            // == FLUX EVENT HANDLERS ========

            // for the Best Word
            $scope.$listenTo(MyStore, 'bestword.*', function () {
                if (MyStore.bestWord) {
                    scores.best = MyStore.bestWord;
                    scores.bestWord = scores.best.score;
                } else {
                    scores.best = '';
                    scores.bestWord = 0;
                }
            });

            // for the User's score
            $scope.$listenTo(MyStore, 'score.*', function() {
                scores.userScore = MyStore.userScore;
            });
        }
    }
})();
