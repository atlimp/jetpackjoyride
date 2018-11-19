class Menu {
  constructor() {
    this.x = 50;
    this.y = 50;
    this.width = g_canvas.width - 100;
    this.height = g_canvas.height - 100;
    this.text = "Jetpack Joyride!";

    this.quit = {
      x: this.x + this.width/2 - 125,
      y: this.y + 150,
      width: 250,
      height: 100,
      text: 'QUIT!'
    };

    this.resume = {
      x: this.x + this.width/2 - 125,
      y: this.y + 300,
      width: 250,
      height: 100,
      text: 'RESUME!'
    };

    this.doNewGame = false;
  }

  setText(text) {
    this.text = text;
    this.resume.text = 'NEW GAME';
    this.doNewGame = true;
  }

  whichButton(x, y) {
    if (x > this.quit.x && x < this.quit.x + this.quit.width) {
      if (y > this.quit.y && y < this.quit.y + this.quit.height) {
        console.log('ýtti á quit');
        g_quit = true;
      }
    }

    if (x > this.resume.x && x < this.resume.x + this.resume.width) {
      if (y > this.resume.y && y < this.resume.y + this.resume.height) {
        if (this.doNewGame) {
          console.log('ýtti á newGame');
          start();
        } else {
          useMenu = false;
        }
      }
    }
  }

  render(ctx) {
    ctx.save();
    ctx.fillStyle = 'black';
    util.fillBox(ctx, this.x, this.y, this.width, this.height);

    ctx.fillStyle = '#bd1313';
    util.fillBox(ctx, this.quit.x, this.quit.y, this.quit.width, this.quit.height);
    util.fillBox(ctx, this.resume.x, this.resume.y, this.resume.width, this.resume.height);

    ctx.strokeStyle = '#fff';
    ctx.strokeRect(this.quit.x, this.quit.y, this.quit.width, this.quit.height);
    ctx.strokeRect(this.resume.x, this.resume.y, this.resume.width, this.resume.height);

    ctx.fillStyle = 'white';
    ctx.font = '30px Courier New';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillText(this.text, this.x + this.width / 2, this.y + 80);
    ctx.fillText(this.quit.text, this.quit.x + this.quit.width / 2, this.quit.y + this.quit.height / 2);
    ctx.fillText(this.resume.text, this.resume.x + this.resume.width / 2, this.resume.y + this.resume.height / 2);

    ctx.restore();
  }


}
