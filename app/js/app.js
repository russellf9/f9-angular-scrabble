'use strict';

angular.module('f9-ionic-seed', ['ionic', 'ngDragDrop', 'angular.filter'])

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
                templateUrl: 'partials/main.html'
            });
        $urlRouterProvider.otherwise('/app/main');
    })


    .run(function(_, $ionicPlatform) {
        $ionicPlatform.ready(function() {
            StatusBar.hide();
        });
    });
