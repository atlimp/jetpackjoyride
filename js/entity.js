class Entity {

  constructor() {
    this.spatialID = spatialManager.getNewSpatialID();
  }

  getSpatialID() {
    return this.spatialID;
  }
}
