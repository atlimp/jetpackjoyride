const NOMINAL_THRUST = -0.25;

class Player extends Entity {

  constructor(sprites) {
    // Call Entity contructor
    super();

    // Positional and velocity stuff
    this.x = g_canvas.width / 6;
    this.y = g_canvas.height / 2;
    this.velY = 0;

    // Sprites is object, includes standing, jumping and car sprite
    this.sprites = sprites;

    // For gun powerup
    this.maxNumBullets = 10;
    this.numBullets = this.maxNumBullets;

    //Keys for movement
    this.KEY_USE = keyCode('F');
    this.KEY_THRUST = keyCode('W');
    this.KEY_JUMP = keyCode(' ');
    this.KEY_LEFT = keyCode('A');
    this.KEY_RIGHT = keyCode('D');


    this.gravity = 0.12;
    this.initialGravity = 0.12;

    // jetpack stuff
    this.maxJetpackLifeTime = 200;
    this.jetPackLifeTime = this.maxJetpackLifeTime;
    this.isJumping = true;

    // For car powerup
    this.maxCarLifetime = 500;
    this.carLifetime = 0;

    this.calcDimensions();

  }

  drawPlayer(ctx) {
    if (this.velY !== 0 || this.y < g_canvas.height - this.halfHeight) {
      this.sprites.jump.drawCentredAt(ctx, this.x, this.y);
    }
    else {
      this.sprites.stand.drawCentredAt(ctx, this.x, this.y);
    }
  }

  // Since width is different depending on car powerup, dimensions are always
  // recalculated
  calcDimensions() {
    if (this.carLifetime > 0) {
      this.halfWidth = (this.sprites.car.width * this.sprites.car.scale) / 2;
      this.halfHeight = (this.sprites.car.height * this.sprites.car.scale) / 2;
    } else {
      this.halfWidth = (this.sprites.stand.width * this.sprites.stand.scale) / 2;
      this.halfHeight = (this.sprites.stand.height * this.sprites.stand.scale) / 2;
    }

  }

  // Draws car sprite at x, y
  drawCar(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.scale(-1, 1);
    ctx.translate(-this.x, -this.y);
    this.sprites.car.drawCentredAt(ctx, this.x, this.y);
    ctx.restore();
  }

  // Chooses wether to draw player or car powerup
  render(ctx) {
    if (this.carLifetime > 0) {
      this.drawCar(ctx);
    } else {
      this.drawPlayer(ctx);
    }

    this.drawFuel(ctx);
    this.drawNumBullets(ctx);

  }

  // Draws fuel bar to indicate either car lifetime or jetPackLifeTime
  drawFuel(ctx) {
    ctx.save();

    let fuelWidth;

    if (this.carLifetime > 0) {
      util.drawImage(ctx, g_images.gasoline, 10, 20, 0.1);
      fuelWidth = util.map(this.carLifetime, 0, this.maxCarLifetime, 0, 200);
    } else {
      util.drawImage(ctx, g_images.jetpack, 10, 20, 0.06);
      fuelWidth = util.map(this.jetPackLifeTime, 0, this.maxJetpackLifeTime, 0, 200);
    }

    const gradient = ctx.createLinearGradient(10, 20, 210, 20);

    gradient.addColorStop(0.0, '#ffffff');
    gradient.addColorStop(0.2, '#ffff00');
    gradient.addColorStop(1.0, '#aa0000');

    ctx.fillStyle = gradient;

    util.fillBox(ctx, 40, 20, fuelWidth, 30);
    ctx.restore();
  }

  // Draws number of bullets left
  drawNumBullets(ctx) {
    ctx.save();
    util.drawImage(ctx, g_images.bullet, 10, 55, 0.2);
    ctx.fillStyle = '#000000';
    ctx.font = '30px sans-serif';
    ctx.fillText(this.numBullets, 40, 85);
    ctx.restore();
  }

  update(du) {
    spatialManager.unregister(this);

    if (this.isDead) {
      console.log('Dead');
	  countManager.dead();
	  //Setti this is dead sem false til að keyra counters áfram
	  this.isDead = false;
    }

    this.calcDimensions();

    if (this.y >= g_canvas.height - this.halfHeight) this.isJumping = false;

    let thrust = this.computeThrust(du);

    thrust += this.gravity;

    this.applyAccel(thrust, du);

    this.horizonalMovement();

    this.handleEdges();

    // charge jetpack, only if not in the air
    if (!this.isJumping && this.jetPackLifeTime < this.maxJetpackLifeTime) {
      this.jetPackLifeTime += du * 0.5;
    }

    // Maybe fire bullet
    if (this.numBullets > 0 && eatKey(this.KEY_USE)) {
      this.numBullets--;
      entityManager.createBullet(this.x, this.y);
    }

    // Update car powerup
    if (this.carLifetime > 0) {
      this.carLifetime -= du;
    }

    // Update speed multiplier if car powerup is disabled
    if (this.carLifetime <= 0) entityManager.setSpeedMult(1);

    this.checkForCollission()

    spatialManager.register(this);
  }

  checkForCollission() {

    // Ask spatialManager to find collission
    const hit = spatialManager.findEntityInRange({
      x: this.x,
      y: this.y,
      halfWidth: this.halfWidth,
      halfHeight: this.halfHeight
    });

    if (hit) {
      // Get type of hit object, powerup or obstacle
      const which = Object.getPrototypeOf(hit.constructor).name;
      if (which === 'Obstacle') {
        // If car powerup is enabled, player is indestructable
        if (this.carLifetime > 0) hit.crash();
        else this.kill();
      }
      // Otherwise check which powerup was collected
      else {
        const powerup = hit.constructor.name;

        switch (powerup) {
          case 'FillTank':
          this.jetPackLifeTime = this.maxJetpackLifeTime;
          hit.consume();
          break;
          case 'Gun':
          this.numBullets = this.maxNumBullets;
          hit.consume();
          break;
          case 'Bar':
          this.carLifetime = this.maxCarLifetime;
          // Set global speed multiplier to 2, speeds everything up
          entityManager.setSpeedMult(2);
          hit.consume();
        }
      }
    }
  }

  horizonalMovement() {
    //Move sprite left or right by 50 to g_canvas.width/3
    if(keys[this.KEY_RIGHT] && this.x < g_canvas.width/3) this.x += 5;
    if(keys[this.KEY_LEFT] && this.x > 50) this.x -= 5;
  }
  
  handleEdges() {
    if (this.y < this.halfHeight) {
      this.y = 0 + this.halfHeight;
      this.velY = 0;
    } else if (this.y > g_canvas.height - this.halfHeight) {
      this.y = g_canvas.height - this.halfHeight;
      this.velY = 0;
    }
  }

  computeThrust(du) {
    let thrust = 0;

    if (keys[this.KEY_THRUST] && this.jetPackLifeTime > 0 && !(this.carLifetime > 0)) {
      this.isJumping = true;
      this.jetPackLifeTime -= du;
      thrust += NOMINAL_THRUST;
    } else if (keys[this.KEY_JUMP] && !this.isJumping) {
      this.isJumping = true
      thrust += NOMINAL_THRUST*30;
    }

    return thrust;
  }

  applyAccel(accelY, du) {
    const oldVelY = this.velY;

    this.velY += accelY * du;

    let avgVelY = (oldVelY + this.velY) / 2;

    this.y += avgVelY * du;
  }

  getPos() {
    return { x: this.x, y: this.y };
  }

  getDimensions() {
    return { halfWidth: this.halfWidth, halfHeight: this.halfHeight };
  }

}
