class Score{
  constructor() {
	   this.score = 0;
  }

  status() {
	   return this.status;
  }

  update(du) {
    this.score += Math.floor(g_speedMult * du);
  }

  render(ctx) {
    ctx.fillText(this.score, g_canvas.width / 2, g_canvas.height / 2);
  }

}
