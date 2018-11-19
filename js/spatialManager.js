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
    const spatialID = entity.getSpatialID();
    delete this._entities[spatialID];
  },

  findEntityInRange: function(dimensions) {
    const {
      x,
      y,
      halfWidth,
      halfHeight,
    } = dimensions;
    for (let i = 0; i < this._entities.length; i++) {
      const entity = this._entities[i];


      if (entity && entity.getPos) {
        const { x: otherX, y: otherY } = entity.getPos();
        const { halfWidth: otherHalfWidth, halfHeight: otherHalfHeight } = entity.getDimensions();
        if (this._collRectRect(x, y, halfWidth, halfHeight, otherX, otherY, otherHalfWidth, otherHalfHeight)) {
          return entity;
        }
      }
    }
  },

  _collRectRect: function(x, y, halfWidth, halfHeight, otherX, otherY, otherHalfWidth, otherHalfHeight) {
    if (otherY > y + halfHeight + otherHalfHeight) return false;
    if (otherX > x + halfWidth + otherHalfWidth) return false;
    if (otherY < y - halfHeight - otherHalfHeight) return false;
    if (otherX < x - halfHeight - otherHalfHeight) return false;

    return true;
  },

  render: function(ctx) {
    for (let i = 0; i < this._entities.length; i++) {
      const entity = this._entities[i];
      if (entity && entity.getPos) {
        const { x, y } = entity.getPos();
        const { halfWidth, halfHeight } = entity.getDimensions();
        ctx.save();
        ctx.strokeStyle = '#ff0000';
        ctx.strokeRect(x - halfWidth, y - halfHeight, halfWidth * 2, halfHeight * 2);
        ctx.restore()
      }
    }
  },

  reset: function() {
    this._nextSpatialID = 1;
    this._entities = [];
  }
};
