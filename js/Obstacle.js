class Obstacle extends Entity {

  constructor(x, y, sprite) {
    super();

    this.sprite = sprite;
    this.x = x;
    this.y = y;

    this.velX = -2;

    this.halfWidth = this.sprite ? (this.sprite.width * this.sprite.scale) / 2: 25;
    this.halfHeight = this.sprite ? (this.sprite.height * this.sprite.scale) / 2 : 25;
  }

  update(du) {
    spatialManager.unregister(this);

    if (this.isDead) return entityManager.KILL_ME_NOW;

    this.x += this.velX * g_speedMult * du;

    if (this.x < -g_canvas.width) this.kill();

    spatialManager.register(this);
  }

  render(ctx) {
    util.fillCircle(ctx, this.x, this.y, this.halfWidth * 2);
  }

  getPos() {
    return { x: this.x, y: this.y };
  }

  getDimensions() {
    return { halfWidth: this.halfWidth, halfHeight: this.halfHeight };
  }

  takeBulletHit() {
    this.kill();
  }

  crash() {
    this.kill();
  }

  setVelMult(val) {
    this.velMult = val;
  }
}
