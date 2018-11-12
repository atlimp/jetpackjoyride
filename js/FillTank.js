class FillTank extends PowerUp {
    constructor(sprite) {
        super();
        this.cy = util.randRange(400, 550);
        this.sprite = sprite;
        this.angle = 0;
        this.freq = util.randRange(0.05, 0.1);
        this.ampl = util.randRange(40, 50);
        this.originalY = this.cy;
    }

    render(ctx) {
        ctx.save();
        this.sprite.drawCentredAt(ctx, this.cx, this.cy);
        ctx.restore();
    }

    update(du) {
        spatialManager.unregister(this);
        this.cy = Math.sin(this.angle) * this.ampl + this.originalY;
        this.cx += this.velX;
        
        this.angle += this.freq;
        this.angle = this.angle > Math.PI * 2 ? 0 : this.angle;

        if (this.cx < -g_canvas.width/6) this.kill();
        if (this.isDead) return entityManager.KILL_ME_NOW;

        spatialManager.register(this);
    }
}