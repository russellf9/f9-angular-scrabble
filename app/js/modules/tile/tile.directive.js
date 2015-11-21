(function() {
    'use strict';

    /**
     * @ngdoc directive
     * @name modules.tile:f9Tile
     * @restrict 'AE'
     * @scope
     * @description
     *  Displays a single Scrabble tile
     */
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
