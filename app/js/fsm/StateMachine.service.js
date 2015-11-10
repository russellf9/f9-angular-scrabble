(function() {
    'use strict';


    /**
     * @ngdoc service
     * @name fsm.StateMachineService
     * @description A Service for a Finite State Machine  <br>
     *     Wrapper for {@link https://github.com/jakesgordon/javascript-state-machine/ javascript-state-machine}  <br>
     */
    angular.module('fsm', [])

        .service('StateMachineService', _stateMachine)

    /**
     * @ngdoc object
     * @name fsm.states
     * @param {String} INITIAL The initial State
     * @description
     *  A constant which holds 'FSM states'
     */
        .constant('states', {
            'INITIAL': 'initial',
            'READY': 'ready',
            'PLAYING': 'playing',
            'PAUSED': 'paused',
            'DONE': 'done',
            'ENDED': 'ended',
            'RESETTING': 'resetting'
        });

    function _stateMachine($log, states) {


        /**
         * @ngdoc method
         * @name StateMachine.create
         * @methodOf fsm.StateMachineService
         * @description Sets up the FSM
         * States <br>
         * 1. initial -> makeReady()
         * 2. ready -> play()
         * 3. playing -> stop()
         * 4. paused ( show best word ) -> finish()
         * 5. paused ( show best word && no tiles ) -> end()
         * 6. done -> reset()
         * 7. resetting -> initialise()
         */
        var fsm = StateMachine.create({
            initial: 'initial',
            events: [
                {name: 'makeReady', from: states.INITIAL, to: states.READY},
                {name: 'play', from: states.READY, to: states.PLAYING},
                {name: 'stop', from: states.PLAYING, to: states.PAUSED},
                {name: 'finish', from: states.PAUSED, to: states.DONE},
                {name: 'end', from: states.PAUSED, to: states.ENDED},
                {name: 'reset', from: [states.DONE, states.ENDED], to: states.RESETTING},
                {name: 'initialise', from: states.RESETTING, to: states.INITIAL}
            ],
            callbacks: {
                onmakeReady: function(event, from, to, msg) {
                },
                onplay: function(event, from, to, msg) {
                },
                onstop: function(event, from, to) {
                },
                onfinish: function(event, from, to) {
                },
                onreset: function(event, from, to) {
                },
                oninitialise: function(event, from, to) {
                },
                onleavestate: function() {
                    _onLeave();
                },
                onenterstate: function() {
                    _onEnter();
                }
            }
        });

        var service = {};

        service.makeReady = _makeReady;

        service.play = _play;

        service.stop = _stop;

        service.finish = _finish;

        service.end = _end;

        service.reset = _reset;

        service.initialise = _initialise;

        service.current = _current;

        // must use an object for the binding...
        service.data = {state: ''};

        return service;

        function _makeReady() {
            fsm.makeReady();
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

        function _end() {
            fsm.end();
        }

        function _reset() {
            fsm.reset();
        }

        function _initialise() {
            fsm.initialise();
        }

        function _current() {
            return (fsm && fsm.current) ? fsm.current : states.INITIAL;
        }

        function _setState() {
            if (!service) {
                $log.error('service not yet defined!');
                return;
            }
            service.data.state = _current();

            $log.info('StateMachine | state is now: ', service.data.state);
        }

        function _onEnter() {
            _setState();
        }

        function _onLeave() {
            _setState();
        }
    }
})
();
