class Entity {

  constructor() {
    this.spatialID = spatialManager.getNewSpatialID();
    this.isDead = false;
  }

  getSpatialID() {
    return this.spatialID;
  }

  kill() {
      this.isDead = true;
  }
}
