class Counter{
  constructor() {
  this.count = 0;
  this.clock = g_startTimer; //Setja klukkuna á 10min timer 50min x 60sec
  this.minutes = 0;
  this.seconds = 0;
  this.display;
  this.x = 300;
  this.y = 200;
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
    // clock incremented by 1 after 60*du
    this.count += 1 
    if (this.count >= 60) {
      this.clock += 1;
      this.count = 0;
    }
  }

  render(ctx) {
    // Render clock display 
    ctx.font = "20px Arial";
    // Variable clock div 60 returns minutes
    this.minutes = Math.floor(this.clock / 60) > 9 ? Math.floor(this.clock / 60) : "0" + (Math.floor(this.clock / 60)).toString();
    // Variable clock modulo 60 returns seconds
    this.seconds = this.clock % 60 > 9 ? this.clock % 60 : "0" + (this.clock % 60).toString();
    this.display = `17:${this.minutes.toString()}:${this.seconds.toString()}`;
    // Context fillText to display time
    ctx.fillText(this.display, this.x, this.y);
  }

}
