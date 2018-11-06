class Bar extends PowerUp {
    constructor(powerUp) {
        super();
        this.velY = 0;
    }

    render(ctx) {
        ctx.save();
        g_ctx.fillStyle = 'purple';
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