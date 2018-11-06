class Gun extends PowerUp {
    constructor(powerUp) {
        super();
        this.gravity = 0.12;
        this.initialGravity = 0.12;
        this.NOMINAL_THRUST = -0.25;
    }

    render(ctx) {
        ctx.save();
        g_ctx.fillStyle = 'red';
        util.fillCircle(ctx, this.cx, this.cy, this.radius);
        //g_ctx.fillStyle = 'black';
        ctx.restore();
    }

    update(du) {
        let thrust = this.computeThrust();
        thrust += this.gravity;
        this.applyAccel(thrust, du);
        this.handleEdges(); 
        this.cx += this.velX * du;
        return this.cx < -g_canvas.width ? entityManager.KILL_ME_NOW : 1;
    }

    handleEdges() {
        if (this.cy < 0) {
            this.cy = this.radius;
            this.velY = 0;
        }
        else if (this.cy > g_canvas.height - this.radius) {
            this.cy = g_canvas.height - this.radius;
        }
    }

    computeThrust() {
        let thrust = 0;
        if (Math.random() < 0.2) {
            thrust += this.NOMINAL_THRUST;
            this.gravity = 0.0;
        }
        else if (Math.random() > 0.8) {
            this.gravity = this.initialGravity;
        }
        return thrust;
    }

    applyAccel(accelY, du) {
        this.velY += accelY * du;
        this.cy += this.velY * du;
    }


    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async powerUpBoolTimer() {
        await sleep(10000);
        // timer fyrir byssuna?
    }
    



}