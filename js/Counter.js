class Counter{
  constructor() {
  this.count = 0;
  this.clock = 0;
  this.minutes = 0;
  this.seconds = 0;
  this.display;
  this.x = 300;
  this.y = 200;
  this.date = new Date('1995-12-17T17:50:50')
  }

  minuteStat() {
	  return this.minutes;
  }
  
  secStat() {
	return this.seconds;
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
	console.log(this.seconds);
  }

  render(ctx) {
    ctx.font = "20px Arial";
    this.minutes = Math.floor(this.clock / 60) > 9 ? Math.floor(this.clock / 60) : "0" + (Math.floor(this.clock / 60)).toString();
    this.seconds = this.clock % 60 > 9 ? this.clock % 60 : "0" + (this.clock % 60).toString();
    this.display = "17:" + this.minutes.toString() + ":" + this.seconds.toString();
    //this.display = "17:" + this.date.getMinutes().toString() + ":" + this.date.getSeconds().toString();
    ctx.fillText(this.display, this.x, this.y);
  }

}