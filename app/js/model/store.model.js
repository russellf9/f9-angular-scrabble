(function() {
    'use strict';


    /**
     * @name model.store:MyStore
     * @ngdoc service
     * @description A Flux Data Store<br>
     */
    angular.module('store', [])
        .constant('actions', {
            'TILE_ADD': 'addTile',
            'TILE_DELETE': 'clearTiles',
            'BESTWORD_SET': 'setBestWord',
            'TIMER_START': 'startTimer',
            'TIMER_STOP': 'stopTimer',
            'TIME_SET': 'setTime',
            'TIME_END': 'endTime',
            'SCORE_UPDATE': 'updateScore'
        })
        .store('MyStore', function() {
            return {
                tiles: [],
                bestWord: '',
                time: '',
                userScore: 0,
                handlers: {
                    'addTile': 'addTile',
                    'clearTiles': 'clearTiles',
                    'setBestWord': 'setBestWord',
                    'startTimer': 'startTimer',
                    'stopTimer': 'stopTimer',
                    'setTime': 'setTime',
                    'endTime': 'endTime',
                    'updateScore': 'setUserScore'
                },
                addTile: function(tile) {
                    this.tiles.push(tile);
                    this.emit('tile.add');
                },
                clearTiles: function() {
                    this.tiles = [];
                    this.emit('tile.delete');
                },
                setBestWord: function(word) {
                    this.bestWord = word;
                    this.emit('bestword.set');
                },
                startTimer: function() {
                    this.emit('timer.start');
                },
                stopTimer: function() {
                    this.emit('timer.stop');
                },
                setTime: function(time) {
                    this.time = time;
                    this.emit('time.set');
                },
                endTime: function() {
                    this.emit('time.end');
                },
                setUserScore: function(score) {
                    this.userScore = score;
                    this.emit('score.update');
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
                    },
                    get time() {
                        return this.time;
                    },
                    get userScore() {
                        return this.userScore;
                    }
                }
            };
        })

        .config(function(fluxProvider) {

            // Globally
            fluxProvider.setMaxListeners(20);

            // Or on each store
            fluxProvider.setMaxListeners({
                'MyStore': 25
            });
        })

        .factory('Stores', function(flux) {
            return {
                'StoreA': flux.createStore('StoreA', {}),
                'StoreB': flux.createStore('StoreB', {})
            };
        });


})();
