(function() {
    'use strict';

    angular.module('f9Timer', [])

        .directive('f9Timer', timer);

    function timer($templateCache) {

        return {
            restrict: 'AE',
            scope: {},
            controller:TimerController,
            controllerAs: 'timer',
            bindToController: true,
            template: $templateCache.get('modules/timer/timer.html')
        };
    }

    function TimerController($log, $scope, $timeout, MyStore, f9TimerService, GameService) {

        var timer = this;

        f9TimerService.initTimer();

        // == REDIRECTION OF BUSINESS LOGIC ========

        // Evaluates when the Timer UI should be shown
        timer.isVisible = function() {
            return GameService.evaluateDisplayTimer();
        };


        // == FLUX EVENT HANDLERS ========

        // Handles the `tick` event
        $scope.$listenTo(MyStore, 'time.*', function () {
            $timeout(function() {
                timer.time = MyStore.time;
            }, 1);
        });

        // Handles the command to start the Timer
        $scope.$listenTo(MyStore, 'timer.start', function () {
            $timeout(function() {
                f9TimerService.startTimer();
            }, 40);
        });

        // Handles the Command to stop the Timer
        $scope.$listenTo(MyStore, 'timer.stop', function () {
            $log.info('Time has stopped!');
            f9TimerService.stopTimer();
        });

        // Handles the when Timer has completed
        $scope.$listenTo(MyStore, 'time.end', function () {
            $log.info('TimerController | time.end');
            GameService.stop();
        });
    }
})();
