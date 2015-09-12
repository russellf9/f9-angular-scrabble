(function() {

    'use strict';

    angular.module('f9-ionic-seed')
        .controller('MainCtrl', mainController);

    function mainController($scope) {
        $scope.data = {};
        $scope.loading = false;
    }
})();
