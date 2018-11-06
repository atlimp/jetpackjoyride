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

  kill() {
    this.isDead = true;
  }

  update(du) {
    spatialManager.unregister(this);

    this.x += this.velX * du;

    if (this.x < -g_canvas.width) this.kill();
    if (this.isDead) return entityManager.KILL_ME_NOW;

    spatialManager.register(this);
  }

  render(ctx) {
    util.fillCircle(ctx, this.x, this.y, this.halfWidth * 2);
  }


}
