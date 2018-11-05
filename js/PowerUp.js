class PowerUp {
    constructor(rand) {
        // for (var property in descr) {
        //     this[property] = descr[property];
        // }
        this.yOff = 20;
        this.xOff = 40;
        this.velX = -2;
        this.velY = 0;
        this.radius = 15;
        this.cx = g_canvas.width + this.xOff;
        this.cy = util.randRange(
            0 + this.yOff, 
            g_canvas.height - this.yOff
        );
        

        
    }

    render(ctx) {
        ctx.save();
        g_ctx.fillStyle = 'red';
        util.fillCircle(ctx, this.cx, this.cy, this.radius);
        ctx.restore();
    }

    update(du) {
        
        let nextX = this.cx + this.velX * du;
        let nextY = this.cy + this.yVel * du;
        
        this.cy += this.velY * du;
        this.cx += this.velX * du;

        return this.cx < -g_canvas.width ? entityManager.KILL_ME_NOW : 1;
    }

    


}

/*
const powerUp = new PowerUp({
    cx: g_canvas.width,
    cy: 0,
    radius: 3,

    xVel: 0,
    yVel: 3
})
*/

/*
  if (g_paddle.collidesWith(prevX, prevY, nextX, nextY, this.radius)) {
    g_powerUpBool = false;
    g_paddle.gunBool = true;
    powerUpBoolTimer();
  }+

*/

