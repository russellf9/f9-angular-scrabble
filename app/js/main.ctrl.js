(function() {

    'use strict';

    angular.module('f9-angular-scrabble')
        .controller('MainCtrl', mainController);

    function mainController($scope) {
        $scope.data = {};
        $scope.loading = false;
    }
})();
