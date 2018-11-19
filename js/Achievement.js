class Achievement  {

  constructor() {
	this.achievements = [];
	
	this.box_W = 200;
	this.box_H = 75;
	
	this.showBox = false;
	
	this.text = "This is the text";
	
	this.timeoutScore = 0;
	this.currentTime = 0;
  }
  
  toSec(min) {
	/*Converts minutes to seconds*/
	return min*60;
  }
  
  drawBox(ctx) {
	  /*Draws the achievement box*/
	const x = g_canvas.width - this.box_W - 20;
	const y = 10;
	ctx.globalAlpha = 0.35;
	ctx.fillStyle = "#000";
	util.fillBox(ctx, x, y, this.box_W, this.box_H);
	ctx.globalAlpha = 0.4;
	ctx.fillStyle = "#FFF";
	ctx.fillText(this.text, (x+30), (y+40));
	ctx.stroke(); 
  }
  
  clockCheck() {
	/*Checks the current game stats to see if an achievement
	  has been completeded and prompts the user*/
	const clock = countManager.clockStat();
	//Verðum að parseInt vegna þess að í counter er þetta string
	const sec = parseInt(clock.sec);
	const min = parseInt(clock.min);  
	this.currentTime = sec + this.toSec(min);
	
	switch(this.currentTime) {
	  case g_startTimer+10:
	    this.timeoutScore = this.currentTime + 5;
	    this.text = "Survived 10sec";
	    this.showBox = true
	    break;	
	  case g_startTimer+60:
        this.timeoutScore = this.currentTime + 5;
	    this.text = "Survive a minute";
	    this.showBox = true;
	    break;
	  case g_startTimer+this.toSec(5):
	    this.timeoutScore = this.currentTime + 5;
	    this.text = "Survive 5 minutes";
	    this.showBox = true;
	    break;
	  case g_startTimer+this.toSec(10):
	    this.timeoutScore = this.currentTime + 5;
	    this.text = "Complete the run";
	    this.showBox = true;
	    break;
	}
	

  }
	  
  update() { 	
  	this.clockCheck();
  }

  render(ctx) {
	if(this.showBox){
		ctx.save();
		this.drawBox(ctx);
		ctx.restore();
	}
	if(this.currentTime === this.timeoutScore){ 
	  this.showBox = false;
	  
	}	
  }
}