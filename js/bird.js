class Bird extends Obstacle {

  constructor(x, y, sprite) {
    // Call Obstacle constructor
    super(x, y, sprite);

    // Bird moves in sin wave.  Random values for frequency and amplitude
    this.angle = 0;
    this.freq = util.randRange(0.05, 0.1);
    this.ampl = util.randRange(20, 70);

    // Bird flap is proportional to up/down frequency
    this.flappingFreq = util.map(this.freq, 0.05, 0.1, 0.1, 0.8);

    // Constant velocity
    this.velX = -4;

    // Used for drawing
    this.spriteCount = 0;
    this.maxCount = 8;

    // halfWidth based on sprite.width.  Sprite.width is width of entire spritesheet
    // So we need to divide by number of cells in spritesheet
    this.halfWidth = (this.sprite.width * this.sprite.scale) / (2 * this.maxCount);

    // Keep track of y centerpoint
    this.origY = y;
  }

  kill() {
    util.playAudio(g_audio.deadBird, 0.5, false);
    this.isDead = true;
  }

  update(du) {
    spatialManager.unregister(this);

    if (this.isDead) return entityManager.KILL_ME_NOW;

    // Update x and y position
    this.x += this.velX * g_speedMult * g_timeSpeedMult * du;
    this.y  = Math.sin(this.angle) * this.ampl + this.origY;

    // Update angle for y position
    this.angle += this.freq;
    this.angle = this.angle > Math.PI * 2 ? 0 : this.angle;

    // If offscreen, kill
    if (this.x < -g_canvas.width) this.kill();

    // update which sprite to draw
    this.spriteCount += this.flappingFreq;
    this.spriteCount %= this.maxCount;

    spatialManager.register(this);
  }

  render(ctx) {
    // Calculate coordinates for current cell to be drawn
    const {
      subX,
      subY,
      width,
      height,
    } = util.getSubCoordinates(this.sprite, Math.floor(this.spriteCount), 1, 8);

    ctx.save();

    ctx.translate(this.x, this.y);
    ctx.scale(-1, 1);
    ctx.translate(-this.x, -this.y);
    this.sprite.drawSubCentredAt(ctx, this.x, this.y, subX, subY, width, height);

    ctx.restore();
  }
}
