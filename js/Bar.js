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
        ctx.translate(this.cx, this.cy);
        ctx.rotate((this.rotation*Math.PI)/2);
        ctx.translate(-this.cx, -this.cy);
        this.sprite.drawCentredAt(ctx, this.cx, this.cy);
        ctx.restore();
    }

    update(du) {
        spatialManager.unregister(this);
        this.cy = Math.sin(this.angle) * this.ampl + this.originalY;
        this.cx += this.velX;

        this.angle += this.freq;
        this.angle = this.angle > Math.PI * 2 ? 0 : this.angle;

        // Flöskurnar svífa upp og niður en nálgast botninn
        this.originalY += 0.3;

        this.rotation += this.freq;
        this.rotation = this.rotation > 360 ? 0 : this.rotation;

        // dunno
        spatialManager.register(this);
        return this.cx < -g_canvas.width/6 ? entityManager.KILL_ME_NOW : 1;
    }



}