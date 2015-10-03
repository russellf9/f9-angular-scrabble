'use strict';

angular.module('f9-angular-scrabble', ['ionic',
    'flux',
    'ngDragDrop',
    'angular.filter',
    'dataApi',
    'templates',
    'Dictionary',
    'Scrabble',
    'ScrabbleService',
    'f9tiles',
    'f9BestWord'])

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

    .store('MyStore', function() {
        return {
            tiles: [],
            bestWord: '',
            handlers: {
                'addTile': 'addTile',
                'setBestWord': 'setBestWord'
            },
            addTile: function(tile) {
                this.tiles.push(tile);
                this.emitChange();
            },
            setBestWord: function(word) {
                this.bestWord = word;
                this.emitChange();
            },
            exports: {
                getTiles: function() {
                    return this.tiles;
                },
                get tiles() {
                    return this.tiles;
                },
                getBestWord: function() {
                    return this.bestWord;
                },
                get bestWord() {
                    return this.bestWord;
                }
            }
        };
    })

    .factory('Stores', function(flux) {
        return {
            'StoreA': flux.createStore('StoreA', {}),
            'StoreB': flux.createStore('StoreB', {})
        }
    })

    .run(function(_, $ionicPlatform) {
        $ionicPlatform.ready(function() {
            StatusBar.hide();
        });
    });
