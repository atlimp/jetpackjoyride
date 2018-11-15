class Background {

  constructor(xVel) {
    this.xOff = 0;

    // Scrolling speed
    this.xVel = xVel;
  }

  render(ctx) {
    ctx.save();
    ctx.translate(this.xOff, 0);

    // Draw images next to each other in order
    for (let i = 0; i < this.images.length; i++) {
      ctx.drawImage(this.images[i], i * this.width, 0, this.width, this.height);
    }

    // Draw first image again, because reasons.
    ctx.drawImage(
      this.images[0],
      this.width * this.images.length,
      0,
      this.width,
      this.height
    );

    ctx.restore();
  }

  // Sets images for this background.  Calculates width and height based on
  // canvas.height, aspect ratio is conserved
  setImages(images) {
    this.images = images
    const origWidth = this.images[0].width;
    const origHeight = this.images[0].height;

    this.height = g_canvas.height;


    this.width = origWidth * (this.height / origHeight);
  }

  update(du) {
    this.xOff += this.xVel * g_speedMult * du;
    this.xOff %= this.width * this.images.length;
  }
}
