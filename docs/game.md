## Game Data / Flux

### Introduction

I don't know if this is the best idea, but I'm thinking about using Flux to store all the game data and state and notify interested parties of the changes.

# Game Store

Assume we have only one player

• Tiles

```
tiles: [],
handlers: {
   'addTile' : 'addTile'
},
addTile: function (tile) {
   this.tiles.push(tile);
   this.emitChange();
},
exports: {
getTiles: function() {
    return this.tiles;
}