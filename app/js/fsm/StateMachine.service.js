(function() {
    'use strict';

    angular.module('fsm', [])

        .service('StateMachineService', _stateMachine);

    function _stateMachine($log) {

        $log.info('StateMachine ');


        /**
         * States
         *
         * 1. initial -> makeReady
         * 2. ready -> play
         * 3. playing ->
         * 4. paused ( show best word )
         * 5. done -> reset
         * 6. resetting -> initialise
         */

        var fsm = StateMachine.create({
            initial: 'initial',
            events: [
                {name: 'makeReady', from: 'initial', to: 'ready'},
                {name: 'play', from: 'ready', to: 'playing'},
                {name: 'stop', from: 'playing', to: 'paused'},
                {name: 'finish', from: 'paused', to: 'done'},
                {name: 'reset', from: 'done', to: 'resetting'},
                {name: 'initialise', from: 'resetting', to: 'initial'}
            ],
            callbacks: {
                onmakeReady: function(event, from, to, msg) {
                    $log.info('FSM -> make ready ' + msg);
                },
                onplay: function(event, from, to, msg) {
                    $log.info('FSM ->  play ' + msg);
                },
                onstop: function(event, from, to) {
                    $log.info('FSM ->  onstop')
                },
                onfinish: function(event, from, to) {
                    $log.info('FSM ->  onfinish')
                },
                onreset: function(event, from, to) {
                    $log.info('FSM ->  onreset')
                },
                oninitialise: function(event, from, to) {
                    $log.info('FSM ->  oninitialise')
                }
            }
        });

        $log.info('StateMachine |fsm: ', fsm);

        var service = {};

        service.makeReady = _makeReady;

        service.play = _play;

        service.stop = _stop;

        service.finish = _finish;

        service.reset = _reset;

        service.initialise = _initialise;

        service.current = _current;


        return service;

        function _makeReady() {
            fsm.makeReady()
        }

        function _play() {
            fsm.play();
        }

        function _stop() {
            fsm.stop();
        }

        function _finish() {
            fsm.finish();
        }

        function _reset() {
            fsm.reset();
        }

        function _initialise() {
            fsm.initialise();
        }

        function _current() {
            return fsm.current;
        }

    }

})();
