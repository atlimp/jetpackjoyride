class Bar extends PowerUp {
    constructor(sprite) {
        super();
        this.velY = 0;
        this.sprite = sprite;
        this.counter = 0.1;
    }

    render(ctx) {
        ctx.save();
        this.sprite.drawCentredAt(ctx, this.cx, this.cy);
        ctx.restore();
    }

    update(du) {

    }



}