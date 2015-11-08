(function() {

    'use strict';

    /**
     * @ngdoc service
     * @name api.dataApi
     * @description A service for data api calls
     */
    angular.module('dataApi', [])

        .service('dataApi', _dataApi);

    function _dataApi($http) {

        return {
            getData: _getData
        };

        /**
         * @ngdoc method
         * @name getData
         * @methodOf api.dataApi
         * @description Gets the data for the dictionary <br> The data is a list of comma-separated values of all the legal Scrabble words
         * @returns {HttpPromise} Returns the result of the data request
         * @private
         */
        function _getData() {
            return $http.get('data/list.csv');
        }

    }


})();