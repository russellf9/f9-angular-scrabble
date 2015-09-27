(function() {
    'use strict';

    angular.module('Dictionary', ['dataApi'])

        .factory('DictionaryService', dictionaryService);

    function dictionaryService(dataApi) {

        var service = {};

        service.dictionary = [];

        // instantiates the dictionary
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