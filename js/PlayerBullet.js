class PlayerBullet extends Entity {
  constructor(sprite, playerX, playerY) {
    super()
    this.cx = playerX + 15;
    this.cy = playerY + 15;
    this.originalY = this.cy;
    this.velX = 5;
    this.offsetX = 10;
    this.offsetY = 40
    this.sprite = sprite;
    this.angle = (Math.PI)/4;
    this.ampl = 150;
    this.freq = 0.025;
    this.rotation = 0;
    this.toRad = Math.PI/180;

    this.halfWidth = this.sprite ? (this.sprite.width * this.sprite.scale) / 2: 25;
    this.halfHeight = this.sprite ? (this.sprite.height * this.sprite.scale) / 2 : 25;

  }

  kill() {
    this.isDead = true;
  }

  render(ctx) {
    ctx.save();
    ctx.translate(this.cx, this.cy);
    ctx.rotate(this.rotation * this.toRad);
    ctx.translate(-this.cx, -this.cy);
    this.sprite.drawCentredAt(ctx, this.cx, this.cy);

    ctx.restore();
  }

  update(du) {
    spatialManager.unregister(this);

    if (this.isDead) return entityManager.KILL_ME_NOW;

    this.cx += this.velX * du;
    this.cy = (
      this.originalY +
      this.offsetY -
      Math.sin(this.angle) *
      this.ampl
    );

    this.angle += this.freq;

    this.rotation += 25;
    this.rotation = this.rotation > 360 ? 0 : this.rotation;

    if (this.cx > g_canvas.width + this.offsetX) this.kill();

    this.checkForCollission();

    spatialManager.register(this);
  }

  checkForCollission() {

    const hit = spatialManager.findEntityInRange({
      x: this.cx,
      y: this.cy,
      halfWidth: this.halfWidth,
      halfHeight: this.halfHeight
    });

    if (hit) {
      const canTakeBullet = hit.takeBulletHit;

      if (canTakeBullet) {
        canTakeBullet.call(hit);
        this.kill();
      }
    }
  }

  getPos() {
    return { x: this.cx, y: this.cy };
  }

  getDimensions() {
    return { halfWidth: this.halfWidth, halfHeight: this.halfHeight };
  }
}
