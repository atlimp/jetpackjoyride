class PowerUp extends Entity {
    constructor(sprite) {
        super();
        this.sprite = sprite;
        this.yOff = 80;
        this.xOff = 40;
        this.velX = -2;
        this.velY = 0;
        this.radius = 15;
        this.cx = g_canvas.width + this.xOff;
        this.cy = util.randRange(
            0 + this.yOff,
            g_canvas.height - this.yOff
        );

        this.halfWidth = this.sprite ? (this.sprite.width * this.sprite.scale) / 2: 25;
        this.halfHeight = this.sprite ? (this.sprite.height * this.sprite.scale) / 2 : 25;

    }

    render(ctx) {
        ctx.save();
        g_ctx.fillStyle = 'red';
        util.fillCircle(ctx, this.cx, this.cy, this.radius);
        ctx.restore();
    }

    update(du) {
        spatialManager.unregister(this);

        if (this.isDead) return entityManager.KILL_ME_NOW;

        let nextX = this.cx + this.velX * du;
        let nextY = this.cy + this.yVel * du;

        this.cy += this.velY * du;
        this.cx += this.velX * du;

        if (this.cx < -g_canvas.width/6) this.kill();

        // dunno
        spatialManager.register(this);
    }

    getPos() {
      return { x: this.cx, y: this.cy };
    }

    getDimensions() {
      return { halfWidth: this.halfWidth, halfHeight: this.halfHeight };
    }

    consume() {
      this.kill();
    }

    takeBulletHit() {
      this.kill();
    }
}
