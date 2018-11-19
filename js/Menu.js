class Menu {
    constructor() {
        this.x = 50;
        this.y = 50;
        this.width = g_canvas.width - 100;
        this.height = g_canvas.height - 100;
        this.text = "Jetpack Joyride!";
        //entityManager.player.isDead() ?
    }

    setText(text) {
        this.text = text;
    }

    render(ctx) {
        ctx.save();
        ctx.fillStyle = 'black';
        //util.fillCircle(ctx, 50, 50, 50);
        util.fillBox(ctx, this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'white';
        ctx.fillText(this.text, this.width/2, this.y + 50);
        util.fillBox(ctx, this.x, this.y, this.width, this.height);
        
        //console.log('hææææ');
        ctx.restore();
    }

    
}