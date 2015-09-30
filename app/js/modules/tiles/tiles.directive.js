(function() {
    'use strict';

    angular.module('f9tiles', [])

        .directive('f9Tiles', tiles);

    function tiles($templateCache) {
        return {
            restrict: 'AE',
            scope: {
                tiles: '='
            },
            controller: tilesController,
            controllerAs: 'vm',
            template: $templateCache.get('modules/tiles/tiles.html'),
            link: tilesLink
        };

        function tilesController($scope) {

        }

        function tilesLink() {

        }
    }
})();