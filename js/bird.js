class Bird extends Obstacle {

  constructor(x, y, sprite) {
    super(x, y, sprite);

    this.angle = 0;
    this.freq = util.randRange(0.05, 0.1);
    this.ampl = util.randRange(20, 70);

    this.velX = -4;

    this.spriteCount = 0;
    this.maxCount = 8;

    this.origY = y;
  }

  update(du) {
    spatialManager.unregister(this);

    this.x += this.velX * du;
    this.y  = Math.sin(this.angle) * this.ampl + this.origY;

    this.angle += this.freq;
    this.angle = this.angle > Math.PI * 2 ? 0 : this.angle;

    if (this.x < -g_canvas.width) this.kill();
    if (this.isDead) return entityManager.KILL_ME_NOW;

    this.spriteCount++;
    this.spriteCount %= this.maxCount;

    spatialManager.register(this);
  }

  render(ctx) {
    const {
      subX,
      subY,
      width,
      height,
    } = util.getSubCoordinates(this.sprite, this.spriteCount, 1, 8);

    ctx.save();

    ctx.translate(this.x, this.y);
    ctx.scale(-1, 1);
    ctx.translate(-this.x, -this.y);
    this.sprite.drawSubCentredAt(ctx, this.x, this.y, subX, subY, width, height);

    ctx.restore();
  }


}
