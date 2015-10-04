(function() {
    'use strict';

    /**
     * An Angular Wrapper for https://github.com/mrchimp/Toc
     */

    angular.module('f9TimerService', [])

        .service('f9TimerService', timer);

    function timer($log, flux) {
        // Constants for Time formatting
        var MS_PER_HOUR               = 3600000,
            MS_PER_MIN                = 60000,
            MS_PER_SEC                = 1000;

        var service = {};

        service.timer = undefined;

        service.initTimer = _initTimer;

        service.startTimer = _startTimer;

        service.stopTimer = _stopTimer;

        return service;



        function _initTimer() {
            // the larger interval of 100 is good for the Angular redraw
            service.timer = new Tock({ interval: 100, callback: _onTick});
        }


        function _startTimer() {
            service.timer.start();
        }

        function _stopTimer() {
            service.timer.stop();
        }

        function _onTick(event) {
            var currentTime = service.timer.timeToMS(service.timer.lap());
            flux.dispatch('setTime', _returnTimeCode(currentTime));
        }

        // returns the time in minutes and seconds
        function _returnTimeCode(ms) {
            if (ms <= 0) {
                return '00:00';
            }

            var seconds = Math.floor((ms / MS_PER_SEC) % 60).toString(),
                minutes = Math.floor((ms / (MS_PER_MIN)) % 60).toString(),
                MS_PER_HOURs = Math.floor((ms / (MS_PER_HOUR)) % 60).toString();

            if ( seconds.length === 1 ) {
                seconds = '0' + seconds;
            }

            if ( minutes.length === 1 ) {
                minutes = '0' + minutes;
            }

            if ( MS_PER_HOURs.length === 1 ) {
                MS_PER_HOURs = '0' + MS_PER_HOURs;
            }

            // just want a simple fomrat foor now
            return minutes + ':' + seconds;
        }
    }
})();
