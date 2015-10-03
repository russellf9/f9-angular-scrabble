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

        vm.reset = function() {
            $log.info('RESET!');
            GameService.reset();
        };

        vm.play = function() {
            GameService.play();
        };

        vm.showBestWord = function() {
            GameService.showBestWord();
        };
    }
})();
