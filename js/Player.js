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

    // Á að vera false;
    this.hasGun = true;

    //Keys for movement
    this.KEY_USE = keyCode('F');
    this.KEY_THRUST = keyCode('W');
    this.KEY_JUMP = keyCode(' ');
    this.KEY_LEFT = keyCode('A');
    this.KEY_RIGHT = keyCode('D');


    this.gravity = 0.12;
    this.initialGravity = 0.12;

    this.maxJetpackLifeTime = 100000;
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

    ctx.save();
    ctx.fillStyle = '#ffff00';
    util.fillBox(ctx, 10, 10, this.jetPackLifeTime * 2, 20);
    ctx.restore()
  }

  update(du) {
    spatialManager.unregister(this);

    if (this.isDead) console.log('dead');

    let thrust = this.computeThrust(du);

    thrust += this.gravity;

    this.applyAccel(thrust, du);

    this.horizonalMovement();

    this.handleEdges();

    if (this.y >= g_canvas.height - this.halfHeight) this.isJumping = false;

    if (!this.isJumping && this.jetPackLifeTime < this.maxJetpackLifeTime) {
      this.jetPackLifeTime += du;
    }

    if (this.hasGun && keys[this.KEY_USE]) {
      entityManager.createBullet(this.x, this.y);
    }

    const hit = spatialManager.findEntityInRange({
      x: this.x,
      y: this.y,
      halfWidth: this.halfWidth,
      halfHeight: this.halfHeight
    });

    if (hit) {
      const which = Object.getPrototypeOf(hit.constructor).name;

      if (which === 'Obstacle') this.kill();
    }

    spatialManager.register(this);
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
