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

        var vm = this;

        f9TimerService.initTimer();

        $scope.$listenTo(MyStore, 'time.*', function () {
            $timeout(function() {
                vm.time = MyStore.time;
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
