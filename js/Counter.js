class Counter{
  constructor() {
	this.count = 0;
	this.x = 300;
	this.y = 200;
	this.speedOfCount = 1;
	this.divisionOfCount = 1;
  }

  status() {
	return this.count;
  }
  
  setSpeed(speed) {
	this.speedOfCount = speed;
  }
  
  setDivision(div) {
	  this.divisionOfCount = div;
  }
  
  setPos(x, y) {
	this.x = x;
	this.y = y;
  }

  update(du) {
    this.count += Math.floor(g_speedMult * du)/this.divisionOfCount;
  }

  render(ctx) {
	ctx.font = "20px Arial";
    ctx.fillText(this.count, this.x, this.y);
  }

}