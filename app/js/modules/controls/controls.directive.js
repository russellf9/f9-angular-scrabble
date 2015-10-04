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

    function ControlsController($log, $scope, GameService) {

        var vm = this;

        vm.deal = function() {
            $log.info('DEAL!');
            GameService.getHand();
        };

        vm.play = function() {
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
