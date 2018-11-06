class EntityManager {

  constructor() {
    this.obstacles = [];
    // powerup fylki
    this.powerups = [];
    this.KILL_ME_NOW = -1;
    this.foo = [
      this.createGun,
      this.createBar
    ];
  }

  
  createGun() {
    let image = new Sprite(g_images.beer1, 0.25);
    return new Gun(image);
  }

  createBar() {
    let image = new Sprite(g_images.beer2, 0.25);
    return new Bar(image);
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

  // búa til random powerup
  // func er lokun á random fall í foo
  createRandomPowerUp() {
    if (this.powerups.length <= 2) {
      let rand = Math.floor(Math.random()*2);
      let func = this.foo[rand];
      this.powerups.push(func());
    }

  }

  render(ctx) {
    this.obstacles.forEach(obstacle => obstacle.render(ctx));
    this.player.render(ctx);
    this.powerups.forEach(powerup => powerup.render(ctx));
  }

  update(du) {
    for (let i = this.obstacles.length - 1; i >= 0; i--) {

      if (this.obstacles[i].update(du) === this.KILL_ME_NOW) {
        this.obstacles.splice(i, 1);
      }

    }
    this.player.update(du);

    for (let i = this.powerups.length - 1; i >= 0; i--) {
      if (this.powerups[i].update(du) === this.KILL_ME_NOW) {
        this.powerups.splice(i, 1);
      }
    }
  }
}


