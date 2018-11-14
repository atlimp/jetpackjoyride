class Rocket extends Obstacle {
  constructor(x, y, sprite) {
    super(x, y, sprite);

    this.isLookingLifeTime = 200;

    this.maxYVel = 2;

    this.accelX = -0.2;
    this.xVel = 0;
    this.yVel = 0;
  }

  render(ctx) {
    if (this.isLookingLifeTime > 0) {
      ctx.save()
      ctx.translate(this.x, this.y);
      ctx.scale(0.3, 0.3);
      ctx.translate(-this.x, -this.y);

      const indicatorX = g_canvas.width - (this.sprite.width * 0.3) - 50
      this.sprite.drawCentredAt(ctx, indicatorX, this.y);
      ctx.restore();
    }

    this.sprite.drawCentredAt(ctx, this.x, this.y);
  }

  update(du) {
    spatialManager.unregister(this);

    if (this.isDead) return entityManager.KILL_ME_NOW;

    if (this.isLookingLifeTime > 0) {
      const { y } = entityManager.getPlayerPos();
      const diff = y - this.y;
      this.yVel = diff < 0 ? -this.maxYVel : this.maxYVel;
      this.y += this.yVel;
      this.isLookingLifeTime -= du;
    } else {
      this.xVel += this.accelX * du;
      this.x += this.xVel * du;
    }


    if (this.x < -g_canvas.width) this.kill();

    spatialManager.register(this);
  }
}
