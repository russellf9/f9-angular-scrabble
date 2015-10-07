(function() {
    'use strict';


    angular.module('f9Controls', ['GameService'])

        .directive('f9Controls', controls);


    function controls($templateCache) {
        return {
            restrict: 'AE',
            scope: {

            },
            controller: ControlsController,
            controllerAs: 'vm',
            bindToController: true, // because the scope is isolated
            template: $templateCache.get('modules/controls/controls.html')
        };
    }

    function ControlsController($log, $scope, GameService, StateMachineService) {

        var vm = this;

        vm.stateData = StateMachineService.data;

        vm.state = vm.stateData.state;

        vm.play = function() {
            GameService.getHand();
            GameService.start();
        };

        vm.stop = function() {
            GameService.stop();
        };

        vm.showBestWord = function() {
            GameService.showBestWord();
        };

        vm.reset = function() {
            $log.info('RESET!');
            GameService.reset();
        };
    }
})();
