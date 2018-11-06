class Obstacle extends Entity {

  constructor(sprite, x, y) {
    super();

    this.sprite = sprite;
    this.x = x;
    this.y = y;

    this.velX = -2;

    this.halfWidth = (this.sprite.width * this.sprite.scale) / 2;
    this.halfHeight = (this.sprite.height * this.sprite.scale) / 2;
  }

  update(du) {
    spatialManager.unregister(this);

    this.x += this.velX * du;

    spatialManager.register(this);

    return this.x < -g_canvas.width ? entityManager.KILL_ME_NOW : 1;
  }

  render(ctx) {
    util.fillCircle(ctx, this.x, this.y, 50);
  }


}
