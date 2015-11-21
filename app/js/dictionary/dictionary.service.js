(function() {

    'use strict';

    /**
     * @name dictionary.DictionaryService
     * @ngdoc service
     * @description A Service for a Dictionary <br>
     * Loads a CSV dictionary, and turns it into an Array
     * @requires api.dataApi
     */

    angular.module('Dictionary', ['dataApi'])

        .service('DictionaryService', dictionaryService);

    function dictionaryService(dataApi) {

        var service = {};

        service.dictionary = [];

        // coverts the dictionary data into an array of words
        service.getDictionary = function() {
            return dataApi.getData()
                .success(function(result) {
                    service.dictionary = result.split(',');
                })
                .error(function(error) {
                    throw('Get Data Error ' + error);
                });

        };
        return  service;
    }


})();