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

  spawnAchievement() {
	  
  }

  removeAcievement() {
	  
  }
  
  toSec(min) {
	return min*60;
  }
  
  drawBox(ctx) {
	const x = g_canvas.width - this.box_W - 20;
	const y = 10;
	ctx.globalAlpha = 0.35;
	ctx.fillStyle = "#000";
	ctx.fillText(this.text, (x+30), (y+40));
	util.fillBox(ctx, x, y, this.box_W, this.box_H);
  }
  
  clockCheck() {
		const clock = countManager.clockStat();
		const sec = clock.sec;
		const min = clock.min;
	  
	  /*if(val > max) {
		this.text = "HIGHSCORE!";
		this.showBox = true;
		countManager.setMaxScore(val);
		return;
	  }*/
	  
	  this.currentTime = sec + this.toSec(min);
	  switch(this.currentTime) {
	    case 10:
		  this.timeoutScore = this.currentTime + 5;
		  this.text = "Survived 10sec";
		  this.showBox = true
		  console.log(this.text);
		  break;
		case 10000:
		  this.timeoutScore = val;
		  this.text = "Got a tenthousand";
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
