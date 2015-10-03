(function() {
    'use strict';

    /**
     * An Angular Wrapper for https://github.com/mrchimp/Toc
     */

    angular.module('f9TimerService', [])

        .service('f9TimerService', timer);

    function timer($log, flux) {


        $log.info('Hello from the Timer!');

        var service = {};

        service.timer = undefined;

        service.initTimer = _initTimer;


        service.startTimer = _startTimer;

        service.stopTimer = _stopTimer;



        return service;

        function _initTimer() {

            $log.info('Service::initTimer');

            service.timer = new Tock({ interval: 100, callback: _onTick});

            $log.info('Service::initTimer | tock ', service.timer);
        }


        function _startTimer() {


            $log.info('Service::StartTimer');

            service.timer.start();

        }

        function _stopTimer() {

            $log.info('Service::StopTimer');
            service.timer.stop();

        }

        function _onTick(event) {

            var currentTime = service.timer.msToTime(service.timer.lap());

            $log.info('currentTime ', currentTime);

            // use this formatting for now

            flux.dispatch('setTime', currentTime);

        }

    }


})();