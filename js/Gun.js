class Gun extends PowerUp {
    constructor(sprite) {
        super();
        this.gravity = 0.12;
        this.NOMINAL_THRUST = -0.15;
        this.sprite = sprite;
        this.rotation = 0;
        this.thrust = 0
        this.freq = util.randRange(0.05, 0.1);
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
        this.rotation += this.freq;
        this.rotation = this.rotation > 360 ? 0 : this.rotation;

        // Fastur hraði
        this.cx += this.velX * du;

        // Thrust þangað til innan við 100 px frá toppi
        if (this.cy < 100) {
            this.NOMINAL_THRUST = 0;
        }
        else if (this.cy > 200) {
            this.NOMINAL_THRUST = -0.16;
        }
        
        let thrust = this.gravity + this.NOMINAL_THRUST;

        this.applyAccel(thrust, du);

        // dunno
        spatialManager.register(this);
        return this.cx < -g_canvas.width/6 ? entityManager.KILL_ME_NOW : 1;
        
    }

    applyAccel(accel, du) {
        this.velY += accel * du;

        this.cy += this.velY * du;
    }

    // handleEdges() {
    //     if (this.cy < 0) {
    //         this.cy = this.radius;
    //         this.velY = 0;
    //     }
    //     else if (this.cy > g_canvas.height - this.radius) {
    //         this.cy = g_canvas.height - this.radius;
    //     }
    // }



    // sleep(ms) {
    //     return new Promise(resolve => setTimeout(resolve, ms));
    // }

    // async powerUpBoolTimer() {
    //     await sleep(10000);
    //     // timer fyrir byssuna?
    // }
    



}