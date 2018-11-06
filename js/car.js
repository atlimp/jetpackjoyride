class Car extends Obstacle {

  constructor(sprite, x, y) {
    super(sprite, x, y);
    this.y = g_canvas.height - this.halfHeight;

  }

  render(ctx) {
    this.sprite.drawCentredAt(ctx, this.x, this.y);
  }
}
