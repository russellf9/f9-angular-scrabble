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

        // Evaluates when the users score should be shown
        timer.isVisible = function() {
            return GameService.evaluateDisplayTimer();
        };


        // == FLUX EVENT HANDLERS ========

        $scope.$listenTo(MyStore, 'time.*', function () {
            $timeout(function() {
                timer.time = MyStore.time;
            }, 1);
        });

        $scope.$listenTo(MyStore, 'timer.start', function () {
            $timeout(function() {
                f9TimerService.startTimer();
            }, 40);
        });

        $scope.$listenTo(MyStore, 'timer.stop', function () {
            f9TimerService.stopTimer();
        });
    }
})();
