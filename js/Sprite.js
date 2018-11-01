class Sprite {
  constructor(image) {
    this.image = image;

    this.width = image.width;
    this.height = image.height;
    this.scale = 0.2;
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
}
//
// function Sprite(image) {
//     this.image = image;
//
//     this.width = image.width;
//     this.height = image.height;
//     this.scale = 1;
// }
//
// Sprite.prototype.drawAt = function (ctx, x, y) {
//     ctx.drawImage(this.image,
//                   x, y);
// };
//
//
// Sprite.prototype.drawWrappedCentredAt = function (ctx, cx, cy, rotation) {
//
//     // Get "screen width"
//     var sw = g_canvas.width;
//
//     // Draw primary instance
//     this.drawWrappedVerticalCentredAt(ctx, cx, cy, rotation);
//
//     // Left and Right wraps
//     this.drawWrappedVerticalCentredAt(ctx, cx - sw, cy, rotation);
//     this.drawWrappedVerticalCentredAt(ctx, cx + sw, cy, rotation);
// };
//
// Sprite.prototype.drawWrappedVerticalCentredAt = function (ctx, cx, cy, rotation) {
//
//     // Get "screen height"
//     var sh = g_canvas.height;
//
//     // Draw primary instance
//     this.drawCentredAt(ctx, cx, cy, rotation);
//
//     // Top and Bottom wraps
//     this.drawCentredAt(ctx, cx, cy - sh, rotation);
//     this.drawCentredAt(ctx, cx, cy + sh, rotation);
// };
