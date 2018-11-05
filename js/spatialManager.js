const spatialManager = {

  _nextSpatialID : 1,
  _entities : [],

  getNewSpatialID: function() {
    return this._nextSpatialID++;
  },

  register: function(entity) {
    const spatialID = entity.getSpatialID();
    this._entities[spatialID] = entity;
  },

  unregister: function(entity) {
    console.log(entity);
    const spatialID = entity.getSpatialID();
    delete this._entities[spatialID];
  },

  findEntityInRange: function(posX, posY, radius) {
  },
}
