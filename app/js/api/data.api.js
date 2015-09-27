(function() {

    'use strict';


    angular.module('dataApi', [])

        .service('dataApi', _dataApi);

    function _dataApi($http) {

        return {
            getData: _getData
        };

        function _getData() {
            return $http.get('data/list.csv');
        }

    }


})();