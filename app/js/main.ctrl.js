(function() {

    'use strict';

    angular.module('f9-angular-scrabble')
        .controller('MainCtrl', MainController);

    function MainController($log, GameService, StateMachineService) {


        this.stateData = StateMachineService.data;


        GameService.init()
            .then(function() {
                _setUp();
            }, function(error) {
                $log.error('Init -> Error: ', error);
            });


        function _setUp() {
            $log.info('MainCtrl From Promise!!!');

        }
    }
})();
