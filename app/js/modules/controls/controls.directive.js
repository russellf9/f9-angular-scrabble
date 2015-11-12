(function() {

    'use strict';

    /**
     * @ngdoc directive
     * @name modules.controls:f9Controls
     * @restrict 'AE'
     * @scope
     * @description
     *  A Directive responsible for the Game Controls <br>
     *  Control Buttons are shown or hidden according to the State of the Game <br>
     * @requires game.GameService
     * @requires fsm.StateMachineService
     **/
    angular.module('f9Controls', ['GameService', 'fsm'])

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

    /**
     * @ngdoc method
     * @name ControlsController
     * @methodOf modules.controls:f9Controls
     * @description
     *  The Directives Controller <br>
     *  Provides methods to control the flow of the Game <br>
     *
     * @param {object} $log For Angular logging
     * @param {service} GameService The Service for game operations
     * @param {object} StateMachineService The Service for FSM operations
     * @param {object} states The Static which provides all the FSM States
     * @constructor
     */
    function ControlsController($log, GameService, StateMachineService, states) {

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

        // == BUSINESS LOGIC ========

        // disable for PLAY
        controls.disablePlayButton = function() {
           return controls.stateData.state !== states.READY;
        };

        // disable for STOP
        controls.disableStopButton = function() {
           return controls.stateData.state !== states.PLAYING;
        };

        // disable for BEST_WORD
        controls.disableBestWordButton = function() {
           return controls.stateData.state !== states.PAUSED;
        };

        // disable for RESET
        controls.disableResetButton = function() {
            return controls.stateData.state !== states.DONE;
        };

        // display for RESET
        controls.displayResetButton = function() {
            return controls.stateData.state !== states.ENDED;
        };

        // disable for REPLAY
        controls.disableReplayButton = function() {
            return controls.stateData.state !== states.ENDED;
        };

        // display for REPLAY
        controls.displayReplayButton = function() {
            return controls.stateData.state === states.ENDED;
        };
    }
})();
