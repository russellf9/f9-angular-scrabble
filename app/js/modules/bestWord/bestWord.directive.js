(function() {
    'use strict';

    angular.module('f9BestWord', [])

        .directive('f9BestWord', bestWord);

    function bestWord($templateCache) {
        return {
            restrict: 'AE',
            scope: {
            },
            controller: BestWordController,
            controllerAs: 'vm',
            bindToController: true, // because the scope is isolated
            template: $templateCache.get('modules/bestWord/best-word.html')
        };

        function BestWordController($scope, $log, StateMachineService,  MyStore) {

            var vm = this;

            vm.stateData = StateMachineService.data;

            vm.state = vm.stateData.state;

            $scope.$listenTo(MyStore, 'bestword.*', function () {

                if (MyStore.bestWord) {
                    vm.best = MyStore.bestWord;
                    vm.wordArray = vm.best.word.split('');
                    vm.score = vm.best.score;
                } else {
                    vm.best = '';
                    vm.wordArray = [];
                    vm.score = 0;
                }
            });
        }
    }
})();
