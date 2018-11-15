class Counter{
  constructor() {
	   this.count = 0;
	   this.x = 300;
	   this.y = 200;
  }

  status() {
	   return this.count;
  }
  
  setPos(x, y) {
	  this.x = x;
	  this.y = y;
  }

  update(du, speed) {
    this.count += Math.floor(g_speedMult * du);
  }

  render(ctx) {
	ctx.font = "20px Arial";
    ctx.fillText(this.count, this.x, this.y);
  }

}
