(function() {
    'use strict';

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
                    // TODO
                });

        };
        return  service;
    }


})();