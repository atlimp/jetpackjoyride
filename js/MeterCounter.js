class MeterCounter{
  constructor() {
	   this.dist = 0;
  }

  status() {
	   return this.dist;
  }

  update(du) {
    this.dist += Math.floor(g_speedMult * du);
  }

  render(ctx) {
	ctx.font = "20px Arial";
    ctx.fillText(this.dist, g_canvas.width/2, g_canvas.height/2);
  }

}
