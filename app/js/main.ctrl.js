(function() {

    'use strict';

    angular.module('f9-angular-scrabble')
        .controller('MainCtrl', mainController);

    function mainController($log, $scope, GameService, StateMachineService) {

        this.state = StateMachineService.current(); // fixme

        this.test = 'russell';

        var main = this;

        $scope.test = 'russell';

        $scope.$watch(angular.bind(this, function() {
            return this.state; // `this` IS the `this` above!!
        }), function(newVal, oldVal) {
            $log.info('state: ', newVal)
            // now we will pickup changes to newVal and oldVal
        });

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
