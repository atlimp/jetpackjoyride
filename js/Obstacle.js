class Obstacle {

  constructor(sprite) {
    this.sprite = sprite;

    this.x = g_canvas.width;
    this.y = util.randRange(0, g_canvas.height);

    this.velX = -2;

    this.halfWidth = 25;
  }

  update(du) {
    this.x += this.velX * du;

    return this.x + this.width < 0 ? entityManager.KILL_ME_NOW : 1;
  }

  render(ctx) {
    util.fillCircle(ctx, this.x, this.y, 50);
  }


}
