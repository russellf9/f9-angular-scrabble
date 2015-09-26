(function() {

    'use strict';

    angular.module('f9-angular-scrabble')
        .controller('MainCtrl', mainController);

    function mainController($scope, $log) {
        $scope.data = {};
        $scope.loading = false;

        $log.info('MainCtrl');


    }
})();
