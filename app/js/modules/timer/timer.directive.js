(function() {
    'use strict';

    angular.module('f9Timer', [])

        .directive('f9Timer', timer);

    function timer($templateCache) {

        return {
            restrict: 'AE',
            scope: {},
            controller:TimerController,
            controllerAs: 'vm',
            bindToController: true,
            template: $templateCache.get('modules/timer/timer.html')
        };
    }

    function TimerController($log, $scope, $timeout, MyStore, f9TimerService) {
        $log.info('TimerController');

        var vm = this;

        f9TimerService.initTimer();

        vm.startTimer = function() {
            f9TimerService.startTimer();
        };

        vm.stopTimer = function() {
            f9TimerService.stopTimer();
        };

        $scope.$listenTo(MyStore, 'time.*', function () {
            $timeout(function() {
                vm.time = MyStore.time;
            }, 1);
        });
    }
})();
