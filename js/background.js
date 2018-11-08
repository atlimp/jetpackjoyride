class Background {

  constructor() {
    this.xOff = 0;
    this.xVel = -2;
  }

  render(ctx) {
    ctx.save();
    ctx.translate(this.xOff, 0);

    for (let i = 0; i < this.images.length; i++) {
      ctx.drawImage(this.images[i], i * this.width, 0);
    }

    ctx.drawImage(this.images[0], this.width * this.images.length, 0);

    ctx.restore();
  }

  setImages(images) {
    this.images = images
    this.width = this.images[0].width;
  }

  update(du) {
    this.xOff += this.xVel * du;
    this.xOff %= this.width * this.images.length;
  }
}
