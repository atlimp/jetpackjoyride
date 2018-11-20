/***
 *  Bar class
 *  Takes a sprite as parameter
 *  Renders a bottle for a powerup
 */

class Bar extends PowerUp {
    constructor(sprite) {
        super(sprite);
        this.velY = 0;

        // angle, ampl, originalY are for sin curve
        // freq increments angle
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
        // spatialManager unregister before each update
        spatialManager.unregister(this);

        // Causes splice if entity is dead
        if (this.isDead) return entityManager.KILL_ME_NOW;

        this.cy = Math.sin(this.angle) * this.ampl + this.originalY;
        this.cx += this.velX * g_speedMult * g_timeSpeedMult * du;

        this.angle += this.freq;
        this.angle = this.angle > Math.PI * 2 ? 0 : this.angle;

        // Flöskurnar svífa upp og niður en nálgast botninn
        this.originalY += 0.3;

        if (this.cx < -g_canvas.width/6) this.kill();

        // dunno
        spatialManager.register(this);
    }



}
