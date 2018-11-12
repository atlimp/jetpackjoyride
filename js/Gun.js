class Gun extends PowerUp {
    constructor(sprite) {
        super();
        this.gravity = 0.12;
        this.NOMINAL_THRUST = -0.15;
        this.sprite = sprite;
        this.rotation = 0;
        this.thrust = 0
        this.angle = 0;
        this.ampl = util.randRange(200,400);
        this.cy = util.randRange(400,600)
        this.originalY = this.cy;
        this.rotation = 0;
        this.freq = 0.01;
        this.velX *= 2;
    }

    render(ctx) {
        ctx.save();
        ctx.translate(this.cx, this.cy);
        ctx.rotate((-this.rotation*Math.PI)/2);
        ctx.translate(-this.cx, -this.cy);
        this.sprite.drawCentredAt(ctx, this.cx, this.cy);
        ctx.restore();
    }


    update(du) {
        spatialManager.unregister(this);

        // Snúningur
        this.rotation += 0.1;
        this.rotation = this.rotation > 360 ? 0 : this.rotation;

        // Fastur hraði
        this.cx += this.velX * du;
        this.cy = this.originalY - Math.sin(this.angle) * this.ampl;

        this.angle += this.freq;
        this.angle = this.angle > Math.PI * 2 ? 0 : this.angle;

        if (this.x < -g_canvas.width/6) this.kill();
        if (this.isDead) return entityManager.KILL_ME_NOW;

        // dunno
        spatialManager.register(this);
        
    }





    // sleep(ms) {
    //     return new Promise(resolve => setTimeout(resolve, ms));
    // }

    // async powerUpBoolTimer() {
    //     await sleep(10000);
    //     // timer fyrir byssuna?
    // }
    



}