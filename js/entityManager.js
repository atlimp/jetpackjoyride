class EntityManager {

  constructor() {
    this.oldSpeedMult = g_speedMult;
    // Array for obstacles
    this.obstacles = [];
    // powerup fylki
    this.powerups = [];

    // Array for bullets
    this.bullets = [];
    this.KILL_ME_NOW = -1;

    // Contructor functions for powerups
    // Makes it easier to get random powerup
    this.powerupsFunc = [
      this.createGun,
      this.createBar,
      this.createFillTank
    ];

    // Contructor functions for obstacles
    // Makes it easier to get random obstacle
    this.obstacleConstructors = [
      this.createCar,
      this.createBird,
      this.createRocket,
    ];

  }

  toggleMenu(text) {
    menu.setText(text);
    useMenu = true;

  }

  /****************************************
  **  Functions to create obstacles and  **
  **  powerups                           **
  ****************************************/
  createCar() {
    const images = [
      g_images.car1,
      g_images.car2,
      g_images.car3,
      g_images.car4,
    ];

    const rand = Math.floor(Math.random() * images.length);

    return new Car(
      g_canvas.width * 2,
      g_canvas.height,
      new Sprite(images[rand], 0.8)
    );
  }

  createBird() {
    const range = util.randRange(70, 120);
    const sprite = new Sprite(g_images.bird, 0.8);

    return new Bird(g_canvas.width * 2, range, sprite);
  }

  createBullet(playerX, playerY) {
    const sprite = new Sprite(g_images.bullet, 0.15);
    this.bullets.push(new PlayerBullet(sprite, playerX, playerY))
  }

  createFillTank() {
    let image = new Sprite(g_images.gasoline, 0.15);
    return new FillTank(image);
  }

  createRocket() {
    let sprite = new Sprite(g_images.rocket, 0.1);
    return new Rocket(g_canvas.width + 100, g_canvas.height / 2, sprite);
  }

  createGun() {
    let image = new Sprite(g_images.bjor1, 0.15);
    return new Gun(image);
  }

  createBar() {
    let image = new Sprite(g_images.bjor2, 0.15);
    return new Bar(image);
  }

  // Creates player
  createPlayer() {
    const sprites = {
      jump: new Sprite(g_images.playerJump, 0.2),
      stand: new Sprite(g_images.playerStand, 0.2),
      car: new Sprite(g_images.monstertruck, 0.9),
    };

    this.player = new Player(sprites);
  }

  // Creates random obstacle, only 4 allowed at a time
  createRandomObstacle(du) {
    if (this.obstacles.length > 4) return;

    const rand = Math.floor(Math.random() * this.obstacleConstructors.length);
    const obs = this.obstacleConstructors[rand];
    this.obstacles.push(obs());
  }

  // búa til random powerup
  // func er lokun á random fall í powerupsFunc
  createRandomPowerUp() {
    if (this.powerups.length <= 2) {
      let rand = Math.floor(Math.random()*this.powerupsFunc.length);
      //let func = this.powerupsFunc[rand];
      // temp test
      let func = this.powerupsFunc[1];
      this.powerups.push(func());
    }

  }

  render(ctx) {
    this.obstacles.forEach(obstacle => obstacle.render(ctx));
    this.player.render(ctx);
    this.powerups.forEach(powerup => powerup.render(ctx));
    this.bullets.forEach(bullet => bullet.render(ctx));
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

    for (let i = this.bullets.length - 1; i >= 0; i--) {

      if (this.bullets[i].update(du) === this.KILL_ME_NOW) {
        this.bullets.splice(i, 1);
      }

    }
  }

  getPlayerPos() {
    return this.player.getPos();
  }

  // Sets global speed multiplier
  setSpeedMult(val) {
    if (val === 2) {
      this.oldSpeedMult = g_speedMult;
      g_speedMult *= val;
    }
    else {
      g_speedMult = this.oldSpeedMult;

    }
    
  }
}
