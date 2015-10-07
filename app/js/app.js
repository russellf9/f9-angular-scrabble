'use strict';

angular.module('f9-angular-scrabble', ['ionic',
    'flux',
    'ngDragDrop',
    'angular.filter',
    'dataApi',
    'templates',
    'Dictionary',
    'Scrabble',
    'store',
    'ScrabbleService',
    'GameService',
    'f9tiles',
    'f9BestWord',
    'f9Controls',
    'f9TimerService',
    'f9Timer',
    'fsm'
])

    .config(function($stateProvider, $urlRouterProvider) {

        console.log('hi!');

        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'partials/app.html'
            })
            .state('app.main', {
                url: '/main',
                controller: 'MainCtrl',
                controllerAs: 'main',
                bindToController: true,
                templateUrl: 'partials/main.html'
            });
        $urlRouterProvider.otherwise('/app/main');
    })

    .run(function(_, $ionicPlatform) {
        $ionicPlatform.ready(function() {
            StatusBar.hide();
        });
    });
