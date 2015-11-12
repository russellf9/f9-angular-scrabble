'use strict';


/**
 * @ngdoc overview
 * @name f9-angular-scrabble
 * @description
 *  An Ionic Application for Scrabble Word Finding
 * @requires ionic
 * @requires flux
 */
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
    'f9tile',
    'f9BestWord',
    'f9Controls',
    'f9TimerService',
    'f9Scores',
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
                controller: 'MainCtrl as main',
                templateUrl: 'partials/main.html'
            });
        $urlRouterProvider.otherwise('/app/main');
    })

    .run(function(_, $ionicPlatform) {
        $ionicPlatform.ready(function() {
            StatusBar.hide();
        });
    });
