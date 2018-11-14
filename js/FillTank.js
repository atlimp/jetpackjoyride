class FillTank extends PowerUp {
    constructor(sprite) {
        super(sprite);
        this.cy = util.randRange(400, 550);
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

        if (this.isDead) return entityManager.KILL_ME_NOW;

        this.cy = Math.sin(this.angle) * this.ampl + this.originalY;
        this.cx += this.velX * g_speedMult * du;

        this.angle += this.freq;
        this.angle = this.angle > Math.PI * 2 ? 0 : this.angle;

        if (this.cx < -g_canvas.width/6) this.kill();

        spatialManager.register(this);
    }
}
