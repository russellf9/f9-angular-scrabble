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
            controllerAs: 'controls',
            bindToController: true, // because the scope is isolated
            template: $templateCache.get('modules/controls/controls.html')
        };
    }

    function ControlsController($log, $scope, GameService, StateMachineService) {

        var controls = this;

        controls.stateData = StateMachineService.data;

        controls.state = controls.stateData.state;

        controls.play = function() {
            GameService.getHand();
            GameService.start();
        };

        controls.stop = function() {
            GameService.stop();
        };

        controls.showBestWord = function() {
            GameService.showBestWord();
        };

        controls.reset = function() {
            GameService.reset();
        };

        controls.replay = function() {
            GameService.replay();
        };

        // Business logic

        controls.displayResetButton = function() {
            return controls.stateData.state !== 'ended';
        };

        controls.displayReplayButton = function() {
            return controls.stateData.state === 'ended';
        };
    }
})();
