class Gun extends PowerUp {
    constructor(sprite) {
        super(sprite);
        this.angle = 0;
        this.ampl = util.randRange(200,400);
        this.cy = util.randRange(400,600)
        this.originalY = this.cy;
        this.freq = 0.01;
        this.velX *= 2;
    }

    render(ctx) {
        ctx.save();
        this.sprite.drawCentredAt(ctx, this.cx, this.cy);
        ctx.restore();
    }


    update(du) {
        // Unregister from spatial manager
        spatialManager.unregister(this);

        // Run splice in entity manager if entity is dead
        if (this.isDead) return entityManager.KILL_ME_NOW;

        // Change in x depends on if driving and time
        this.cx += this.velX * g_speedMult * g_timeSpeedMult * du;
        // Long sin curve to throw bottle on canvas
        this.cy = this.originalY - Math.sin(this.angle) * this.ampl;

        // Angle has 360° modulo
        this.angle += this.freq;
        this.angle = this.angle > Math.PI * 2 ? 0 : this.angle;

        // Kill entity if off the canvas on the left
        if (this.cx < -g_canvas.width/6) this.kill();

        // Register in spatial manager
        spatialManager.register(this);

    }

}
