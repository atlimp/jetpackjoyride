const NOMINAL_THRUST = -0.25;

class Player extends Entity {

  constructor(sprites) {
    // Call Entity contructor
    super();

    this.x = g_canvas.width / 6; //Make sure that the player object is closer to the left
    this.y = g_canvas.height / 2;
    this.velY = 0;

    this.sprites = sprites;

    /* Þetta á ekki að vera hér?
    this.powerup = null;

    this.powerup = new Gun();
    */

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

    this.maxJetpackLifeTime = 1000;
    this.jetPackLifeTime = this.maxJetpackLifeTime;
    this.isJumping = true;

    this.halfWidth = (this.sprites.stand.width * this.sprites.stand.scale) / 2;
    this.halfHeight = (this.sprites.stand.height * this.sprites.stand.scale) / 2;

  }

  render(ctx) {
    if (this.velY !== 0 || this.y < g_canvas.height - this.halfHeight) {
      this.sprites.jump.drawCentredAt(ctx, this.x, this.y);
    }
    else {
      this.sprites.stand.drawCentredAt(ctx, this.x, this.y);
    }

    this.drawFuel(ctx);
    this.drawNumBullets(ctx);

  }

  drawFuel(ctx) {
    ctx.save();
    ctx.drawImage(g_images.gasoline, 10, 20, 20, 30);

    const fuelWidth = util.map(this.jetPackLifeTime, 0, this.maxJetpackLifeTime, 0, 200)

    const gradient = ctx.createLinearGradient(10, 20, 210, 20);

    gradient.addColorStop(0.0, '#ffffff');
    gradient.addColorStop(0.2, '#ffff00');
    gradient.addColorStop(1.0, '#aa0000');

    ctx.fillStyle = gradient;

    util.fillBox(ctx, 40, 20, fuelWidth, 30);
    ctx.restore();
  }

  drawNumBullets(ctx) {
    ctx.save();
    ctx.drawImage(g_images.bullet, 10, 55, 20, 30);
    ctx.font = '30px sans-serif';
    ctx.fillText(this.numBullets, 40, 85);
    ctx.restore();
  }

  update(du) {
    spatialManager.unregister(this);

    if (this.isDead) {
      console.log('Dead');
    }

    let thrust = this.computeThrust(du);

    thrust += this.gravity;

    this.applyAccel(thrust, du);

    this.horizonalMovement();

    this.handleEdges();

    if (this.y >= g_canvas.height - this.halfHeight) this.isJumping = false;

    if (!this.isJumping && this.jetPackLifeTime < this.maxJetpackLifeTime) {
      this.jetPackLifeTime += du;
    }

    if (this.numBullets > 0 && eatKey(this.KEY_USE)) {
      this.numBullets--;
      entityManager.createBullet(this.x, this.y);
    }

    this.checkForCollission()

    spatialManager.register(this);
  }

  checkForCollission() {

    const hit = spatialManager.findEntityInRange({
      x: this.x,
      y: this.y,
      halfWidth: this.halfWidth,
      halfHeight: this.halfHeight
    });

    if (hit) {
      const which = Object.getPrototypeOf(hit.constructor).name;
      if (which === 'Obstacle') this.kill();
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
          // Gera eitthvað
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

    if (keys[this.KEY_THRUST] && this.jetPackLifeTime > 0) {
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
