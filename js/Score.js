class Score{
  constructor() {
	   this.score = 0;
  }

  status() {
	   return this.score;
  }

  update(du) {
    this.score += Math.floor(g_speedMult * du);
  }

  render(ctx) {
	ctx.font = "20px Arial";
    ctx.fillText(this.score, g_canvas.width / 2, 20);
  }

}
