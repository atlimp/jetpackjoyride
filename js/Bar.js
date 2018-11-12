class Bar extends PowerUp {
    constructor(sprite) {
        super();
        this.velY = 0;
        this.sprite = sprite;
        this.angle = 0;
        this.freq = util.randRange(0.05, 0.1);
        this.ampl = util.randRange(20, 70);
        this.originalY = this.cy;
        this.rotation = 0;
        this.freq = util.randRange(0.05, 0.1);
    }

    // Rotation á render
    render(ctx) {
        ctx.save();
        this.sprite.drawCentredAt(ctx, this.cx, this.cy);
        ctx.restore();
    }

    update(du) {
        spatialManager.unregister(this);
        this.cy = Math.sin(this.angle) * this.ampl + this.originalY;
        this.cx += this.velX * du;

        this.angle += this.freq;
        this.angle = this.angle > Math.PI * 2 ? 0 : this.angle;

        // Flöskurnar svífa upp og niður en nálgast botninn
        this.originalY += 0.3;

        if (this.x < -g_canvas.width/6) this.kill();
        if (this.isDead) return entityManager.KILL_ME_NOW;

        // dunno
        spatialManager.register(this);
    }



}