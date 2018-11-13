class Entity {

  constructor() {
    this.spatialID = spatialManager.getNewSpatialID();
    this.isDead = false;
  }

  getSpatialID() {
    return this.spatialID;
  }

  getType() {
    return this.type || 'rect';
  }

  kill() {
      this.isDead = true;
  }
}
