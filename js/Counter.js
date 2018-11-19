class Counter{
  constructor() {
  this.count = 0;
  this.clock = 0;
  this.minutes = 0;
  this.seconds = 0;
  this.display;
	this.x = 300;
	this.y = 200;
	this.speedOfCount = 1;
  this.divisionOfCount = 1;
  this.countClock = false;
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
    this.count += 1 //Math.floor(g_speedMult * du)/this.divisionOfCount;
    if (this.count >= 60) {
      this.clock += 1;
      this.count = 0;
    } 
  }

  render(ctx) {
    ctx.font = "20px Arial";
    this.minutes = Math.floor(this.clock / 60) > 9 ? Math.floor(this.clock / 60) : "0" + (Math.floor(this.clock / 60)).toString();
    this.seconds = this.clock % 60 > 9 ? this.clock % 60 : "0" + (this.clock % 60).toString();
    this.display = "17:" + this.minutes.toString() + ":" + this.seconds.toString();
    ctx.fillText(this.display, this.x, this.y);
  }

}