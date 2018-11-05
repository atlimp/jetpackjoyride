class EntityManager {


  constructor() {
    this.obstacles = [];
    // powerup fylki
    this.powerup = [];
    this.KILL_ME_NOW = -1;
	this.objCounter = 0;
	
	this.spatialID = spatialManager.getNewSpatialID();
  }

  createPlayer(images) {
    this.player = new Player({
        jump: new Sprite(images.jump, 0.2),
        stand: new Sprite(images.stand, 0.2)
      }); 
  }

  createRandomObstacle() {
    this.obstacles.push(new Zapper());
  }

  // búa til powerup
  createPowerUp() {
    this.powerup.push(new PowerUp({
      cx: 50,
      cy: 50,
      radius: 3
    }));
  }

  render(ctx) {
    this.obstacles.forEach(obstacle => obstacle.render(ctx));
    this.player.render(ctx);
  }

  update(du) {
    for (let i = this.obstacles.length - 1; i >= 0; i--) {
      
		if (this.obstacles[i].update(du) === this.KILL_ME_NOW)
        this.obstacles.splice(i, 1);
    }
	
    this.player.update(du);

    for (let i = this.powerup.length - 1; i >= 0; i--) {
      this.powerup[i].update(du);
    }
  }
	/*Return pos of an obstacle*/
  getPos() {
	return {posX : this.x, posY : this.y};
  }
	/*Find the entity that the player is touching*/
  findHitEntity() {
	const pos = this.obstacleGetPos();
		
	return spatialManager.findEntityInRange(pos.posX, pos.posY, 0);
  }
  
  getSpatialID() {
	  return this.spatialID;
  }
}
