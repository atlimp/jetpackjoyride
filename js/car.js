class Car extends Obstacle {

  constructor(sprite, x, y) {
    super(sprite, x, y);
    this.velX = Math.floor(util.randRange(-2, -8));
    this.y = g_canvas.height - this.halfHeight;
  }

  kill() {
    util.playAudio(g_audio.deadCar);
    this.isDead = true;
  }

  render(ctx) {
    // if (Math.random() < 0.01) util.playAudio(g_audio.horn2);
    this.sprite.drawCentredAt(ctx, this.x, this.y);
  }
}
