class Zapper extends Obstacle {

	
  constructor(sprite) {
    super(sprite);
    this.rotation = util.randRange(-Math.PI / 2, Math.PI / 2);
    this.spacing = util.randRange(100, 150);
	this.numberOfZappers = 0;
	this.maxZapper = 3;
  }

  render(ctx) {
	this.drawZapper(ctx);
  }
  
  drawZapper(ctx) {
	ctx.save();

    // Matrix magic for rotation
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.translate(-this.x, -this.y);

    // Draw yellow electricity
    ctx.fillStyle = '#ffff00';
    util.fillBox(ctx, this.x, this.y, this.spacing, 10);

    // Draw grey circles on either side
    ctx.fillStyle = '#666666';
    util.fillCircle(ctx, this.x, this.y, this.halfWidth);
    util.fillCircle(ctx, this.x + this.spacing, this.y, this.halfWidth);

    ctx.restore();
  }
}
 