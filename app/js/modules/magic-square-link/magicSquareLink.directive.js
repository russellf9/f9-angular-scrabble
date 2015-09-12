(function(){
	'use strict';

	angular.module('f9-magic-square', [])

		.directive('f9MagicSquareLink', magicSquareLink);

		function magicSquareLink($templateCache) {
			return {
				restrict: 'AE',
				template: $templateCache.get('modules/magic-square-link/magicSquareLink.html')
			}
		}
})();
