(function() {
    'use strict';

    angular.module('Dictionary', [])

        .service('DictionaryService', dictionaryService);

    function dictionaryService(_, $http) {

        var service = {};

        service.getDictionary = _getDictionary;

        service.data = "";

        // var array = string.split(',');


        // TODO move to api file
        $http.get('data/list.csv').success(function(data) {
            service.dataArray = data.split(',');
        });


        return  service;
    }

    function _getDictionary() {

    }

})();