class Background {

  constructor(xVel) {
    this.xOff = 0;
    this.xVel = xVel;
  }

  render(ctx) {
    ctx.save();
    ctx.translate(this.xOff, 0);

    for (let i = 0; i < this.images.length; i++) {
      ctx.drawImage(this.images[i], i * this.width, 0, this.width, this.height);
    }

    ctx.drawImage(
      this.images[0],
      this.width * this.images.length,
      0,
      this.width,
      this.height
    );

    ctx.restore();
  }

  setImages(images) {
    this.images = images
    const origWidth = this.images[0].width;
    const origHeight = this.images[0].height;

    this.height = g_canvas.height;


    this.width = origWidth * (this.height / origHeight);
  }

  update(du) {
    this.xOff += this.xVel * du;
    this.xOff %= this.width * this.images.length;
  }
}
