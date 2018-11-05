/*

spatialManager.js

A module which handles spatial lookup, as required for...
e.g. general collision detection.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

var spatialManager = {

// "PRIVATE" DATA

_nextSpatialID : 1, // make all valid IDs non-falsey (i.e. don't start at 0)

_entities : [],

// "PRIVATE" METHODS
//
// <none yet>


// PUBLIC METHODS

getNewSpatialID : function() {
    return this._nextSpatialID++;
},

register: function(entity) {
    var pos = entityManager.getPos();
    var spatialID = entityManager.getSpatialID();
    this._entities[spatialID] = entity;
},

unregister: function(entity) {
    var spatialID = entityManager.getSpatialID();
    delete this._entities[spatialID];
},

findEntityInRange: function(posX, posY, radius) {
    for (var i = 0; i < this._entities.length; i++){
      var other = this._entities[i];
      if (!other){
        continue;
      }
      var blaPos = other.getPos();
      var blaRad = other.getRadius();
      if (util.wrappedDistSq(
        posX,
        posY,
        blaPos.posX,
        blaPos.posY,
        g_canvas.width,
        g_canvas.height
      ) < util.square(radius+blaRad)){
          return other;
      }
    }

},

render: function(ctx) {
    var oldStyle = ctx.strokeStyle;
    ctx.strokeStyle = "red";
    for (var ID in this._entities) {
        var e = this._entities[ID];
        var ePos = e.getPos();
        var eRad = e.getRadius();
        util.strokeCircle(ctx, ePos.posX, ePos.posY, eRad);
    }
    ctx.strokeStyle = oldStyle;
}

}
