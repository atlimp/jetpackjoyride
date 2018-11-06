class Bird extends Obstacle {

  constructor(x, y, sprite) {
    super(x, y, sprite);

    this.angle = 0;
    this.freq = util.randRange(0.05, 0.1);
    this.ampl = util.randRange(20, 70);

    this.velX = -4;

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

    spatialManager.register(this);
  }


}
