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

    this.obstacleConstructors = [
      this.createCar,
    ];
  }

  createCar() {
    const images = [
      g_images.car1,
      g_images.car2,
      g_images.car3,
      g_images.car4,
    ];

    const rand = Math.floor(Math.random() * images.length);

    return new Car(
      new Sprite(images[rand]),
      g_canvas.width * 2,
      g_canvas.height
    );
  }

  createGun() {
    return new Gun();
  }

  createBar() {
    return new Bar();
  }


  createPlayer(images) {
    this.player = new Player({
      jump: new Sprite(images.jump, 0.2),
      stand: new Sprite(images.stand, 0.2)
    });
  }

  createRandomObstacle(du) {
    if (this.obstacles.length > 4) return;

    const rand = Math.floor(Math.random() * this.obstacleConstructors.length);
    const obs = this.obstacleConstructors[rand];
    this.obstacles.push(obs());
  }

  // búa til random powerup
  // func er lokun á random fall í foo
  createRandomPowerUp() {
    if (this.powerups.length <= 2) {
      let rand = Math.floor(Math.random()*this.foo.length);
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
