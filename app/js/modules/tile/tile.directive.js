(function() {
    'use strict';

    angular.module('f9tile', [])

        .directive('f9Tile', tile);

    function tile($templateCache) {
        return {
            restrict: 'AE',
            scope: {
                theTile: '='
            },
            template: $templateCache.get('modules/tile/tile.html')
        };

    }
})();

