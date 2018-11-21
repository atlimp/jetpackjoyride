class FillTank extends PowerUp {
  constructor(sprite) {
    super(sprite);
    this.cy = util.randRange(400, 550);
    this.angle = 0;
    this.freq = util.randRange(0.05, 0.1);
    this.ampl = util.randRange(40, 50);
    this.originalY = this.cy;
  }

  render(ctx) {
    ctx.save();
    this.sprite.drawCentredAt(ctx, this.cx, this.cy);
    ctx.restore();
  }

  update(du) {
    // Unregister from spatial manager
    spatialManager.unregister(this);

    // If entity is dead enitity manager splices entity from array
    if (this.isDead) return entityManager.KILL_ME_NOW;

    // Sin curve on y-axis, change in x depends on if driving
    // and time
    this.cy = Math.sin(this.angle) * this.ampl + this.originalY;
    this.cx += this.velX * g_speedMult * g_timeSpeedMult * du;

    // 360° modulo on angle, increment between 0.05 and 0.1
    this.angle += this.freq;
    this.angle = this.angle > Math.PI * 2 ? 0 : this.angle;

    // Kill entity is off the canvas to the left
    if (this.cx < -g_canvas.width/6) this.kill();

    // Register in spatial manager
    spatialManager.register(this);
  }
}
