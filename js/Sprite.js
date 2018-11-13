class Sprite {
  constructor(image, scale) {
    this.image = image;

    this.width = image.width;
    this.height = image.height;
    this.scale = scale || 1;
  }

  drawCentredAt(ctx, cx, cy) {
    const w = this.width;
    const h = this.height;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(this.scale, this.scale);

    // drawImage expects "top-left" coords, so we offset our destination
    // coords accordingly, to draw our sprite centred at the origin
    ctx.drawImage(
      this.image,
      -w / 2,
      -h / 2,
    );

    ctx.restore();
  }

  drawSubCentredAt(ctx, cx, cy, subX, subY, subW, subH) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(this.scale, this.scale);

    // drawImage expects "top-left" coords, so we offset our destination
    // coords accordingly, to draw our sprite centred at the origin
    ctx.drawImage(
      this.image,
      subX,
      subY,
      subW,
      subH,
      -subW / 2,
      -subH / 2,
      subW,
      subH
    );

    ctx.restore();
  }
}
