class PowerUp extends Entity {
  constructor(sprite) {
    super();
    // Gets the sprite as parameter
    this.sprite = sprite;
    // Keeps entity within canvas
    this.yOff = 80;
    this.xOff = 40;
    this.velX = -2;
    this.velY = 0;
    this.radius = 15;

    this.halfWidth = this.sprite ? (this.sprite.width * this.sprite.scale) / 2: 25;
    this.halfHeight = this.sprite ? (this.sprite.height * this.sprite.scale) / 2 : 25;


    this.cx = g_canvas.width + this.xOff;
    this.cy = util.randRange(
      0 + (this.yOff + this.halfHeight),
      g_canvas.height - (this.yOff + this.halfHeight)
    );


  }

  // Render powerups
  render(ctx) {
    ctx.save();
    g_ctx.fillStyle = 'red';
    util.fillCircle(ctx, this.cx, this.cy, this.radius);
    ctx.restore();
  }

  // Update powerup
  update(du) {
    // Unregister from spatial manager
    spatialManager.unregister(this);

    // Run splice in entity manager if entity is dead
    if (this.isDead) return entityManager.KILL_ME_NOW;

    // Constant velocity on x
    this.cx += this.velX * du;

    // If entity has gone off the canvas on the left, kill it
    if (this.cx < -g_canvas.width/6) this.kill();

    // Register in spatial manager
    spatialManager.register(this);
  }

  getPos() {
    return { x: this.cx, y: this.cy };
  }

  getDimensions() {
    return { halfWidth: this.halfWidth, halfHeight: this.halfHeight };
  }

  consume() {
    this.kill();
  }

  takeBulletHit() {
    this.kill();
  }
}
