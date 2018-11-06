class Bar extends PowerUp {
    constructor(sprite) {
        super();
        this.velY = 0;
        this.sprite = sprite;
        this.angle = 0;
        this.freq = util.randRange(0.05, 0.1);
        this.ampl = util.randRange(20, 70);
        this.originalY = this.cy;
    }

    render(ctx) {
        ctx.save();
        this.sprite.drawCentredAt(ctx, this.cx, this.cy);
        ctx.restore();
    }

    update(du) {
        this.cy  = Math.sin(this.angle) * this.ampl + this.originalY;
        this.cx += this.velX;
        this.angle += this.freq;
        this.angle = this.angle > Math.PI * 2 ? 0 : this.angle;
    }



}