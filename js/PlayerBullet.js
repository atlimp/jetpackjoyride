class PlayerBullet extends Entity {
    constructor(playerX, playerY) {
        super()
        this.cx = playerX + 10;
        this.cy = playerY;
        //this.originalY = this.cy;
        this.velX = 5;
        this.radius = 10;
        this.offsetX = 10;
        //this.sprite = sprite;
        //this.angle = 0;

    }

    kill() {
        this.isDead = true;
    }

    render(ctx) {
        ctx.save();
        util.fillCircle(ctx, this.cx, this.cy, this.radius);
        ctx.restore();
    }

    // Vantar kill me now
    update(du) {
        spatialManager.unregister(this);

        this.cx += this.velX * du;
        //this.cy += Math.sin(this.angle)

        if (this.cx > g_canvas.width + this.offsetX) this.kill();
        if (this.isDead) return entityManager.KILL_ME_NOW;

        spatialManager.register(this);
    }
}