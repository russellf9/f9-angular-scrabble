(function() {
    'use strict';

    /**
     * An Angular Wrapper for https://github.com/mrchimp/Tock
     */

    angular.module('f9TimerService', [])

        .service('f9TimerService', timer)

        .constant('times', {
            'ONE_MINUTE': '01:00',
            'FIVE_SECONDS': '00:05'
        });

    function timer($log, flux, actions, times) {
        // Constants for Time formatting
        var MS_PER_HOUR = 3600000,
            MS_PER_MIN = 60000,
            MS_PER_SEC = 1000;

        var service = {};

        service.timer = undefined;

        service.initTimer = _initTimer;

        service.startTimer = _startTimer;

        service.stopTimer = _stopTimer;

        return service;


        // == IMPLEMENTATION OF PUBLIC FUNCTIONS ========


        function _initTimer() {
            // the larger interval of 100 is good for the Angular redraw
            service.timer = new Tock({
                countdown: true, interval: 100,
                callback: _onTick, complete: _onComplete
            });
        }

        // Starts a countdown with a length of a minute
        function _startTimer() {
            service.timer.start(times.ONE_MINUTE);
        }

        // halts the timer and resets
        function _stopTimer() {
            $log.info('Timer Service Stop Timer!');
            service.timer.stop();
            service.timer.reset(); // side-effect of resetting to 0, so the timer will restart correctly
        }


        // == IMPLEMENTATION OF TIMER EVENTS ========

        function _onTick(event) {
            var currentTime = service.timer.timeToMS(service.timer.lap());
            flux.dispatch(actions.TIME_SET, _returnTimeCode(currentTime));
        }

        function _onComplete(event) {
            flux.dispatch(actions.TIME_END);
        }


        // == UTILITIES ========

        // A utility function which returns the time in minutes and seconds
        function _returnTimeCode(ms) {
            if (ms <= 0) {
                return '00:00';
            }

            var seconds = Math.floor((ms / MS_PER_SEC) % 60).toString(),
                minutes = Math.floor((ms / (MS_PER_MIN)) % 60).toString(),
                MS_PER_HOURs = Math.floor((ms / (MS_PER_HOUR)) % 60).toString();

            if (seconds.length === 1) {
                seconds = '0' + seconds;
            }

            if (minutes.length === 1) {
                minutes = '0' + minutes;
            }

            if (MS_PER_HOURs.length === 1) {
                MS_PER_HOURs = '0' + MS_PER_HOURs;
            }

            // just want a simple format for now
            return minutes + ':' + seconds;
        }
    }
})();
