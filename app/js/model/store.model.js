(function() {
    'use strict';

    angular.module('store', [])
        .store('MyStore', function() {
            return {
                tiles: [],
                bestWord: '',
                time: '',
                handlers: {
                    'addTile': 'addTile',
                    'clearTiles': 'clearTiles',
                    'setBestWord': 'setBestWord',
                    'setTime': 'setTime'
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
                setTime: function(time) {
                    this.time = time;
                    this.emit('time.set');
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
                    }
                }
            };
        })

        .factory('Stores', function(flux) {
            return {
                'StoreA': flux.createStore('StoreA', {}),
                'StoreB': flux.createStore('StoreB', {})
            };
        });


})();