class Obstacle extends Entity {

  constructor(sprite) {
    super();
    
    this.sprite = sprite;
    this.x = g_canvas.width;
    this.y = util.randRange(0, g_canvas.height);

    this.velX = -2;

    this.halfWidth = 25;
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
