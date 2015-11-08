(function() {
    'use strict';

    angular.module('fsm', [])

        .service('StateMachineService', _stateMachine);

    function _stateMachine($log) {

        /**
         * States
         *
         * 1. initial -> makeReady()
         * 2. ready -> play()
         * 3. playing -> stop()
         * 4. paused ( show best word ) -> finish()
         * 5. paused ( show best word && no tils ) -> end()
         * 6. done -> reset()
         * 7. resetting -> initialise()
         */

        var fsm = StateMachine.create({
            initial: 'initial',
            events: [
                {name: 'makeReady', from: 'initial', to: 'ready'},
                {name: 'play', from: 'ready', to: 'playing'},
                {name: 'stop', from: 'playing', to: 'paused'},
                {name: 'finish', from: 'paused', to: 'done'},
                {name: 'end', from: 'paused', to: 'ended'},
                {name: 'reset', from: ['done','ended'], to: 'resetting'},
                {name: 'initialise', from: 'resetting', to: 'initial'}
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
            return (fsm && fsm.current) ? fsm.current : 'initial';
        }

        function _setState() {
            if(!service) {
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
