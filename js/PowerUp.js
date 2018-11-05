class PowerUp {
    constructor(descr) {
        for (var property in descr) {
            this[property] = descr[property];
        }
        this.velX = -2;
        this.velY = 2;
    }

    render() {
        g_ctx.fillStyle = 'red';
        util.fillCircle(this.cx, this.cy, this.radius);
        //g_ctx.fillStyle = 'black';
    }

    update(du) {
        let nextX = this.cx + this.velX * du;
        let nextY = this.cy + this.yVel * du;
        
        this.cy += this.velY * du;
        this.cx += this.velX * du;
    }

    /*
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async powerUpBoolTimer() {
        await sleep(10000);
        // timer fyrir byssuna?
    }
    */

    


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

