class Achievement  {

  constructor() {
	this.achievements = [];
	
	this.box_W = 200;
	this.box_H = 75;
	
	this.showBox = false;
	
	this.text = "This is the text";
	
	this.timeoutScore = 0;
  }

  spawnAchievement() {
	  
  }

  removeAcievement() {
	  
  }
  
  drawBox(ctx) {
	const x = g_canvas.width - this.box_W - 20;
	const y = 10;
	ctx.globalAlpha = 0.35;
	ctx.fillStyle = "#000";
	ctx.fillText(this.text, (x+30), (y+40));
	util.fillBox(ctx, x, y, this.box_W, this.box_H);
  }
  
  scoreCheck() {
	  const val = countManager.scoreStatus();
	  const max = countManager.maxScoreStatus();
	  
	  /*if(val > max) {
		this.text = "HIGHSCORE!";
		this.showBox = true;
		countManager.setMaxScore(val);
		return;
	  }*/
	  
	  
	  switch(val) {
	    case 1000:
		  this.timeoutScore = val;
		  this.text = "Got a thousand";
		  this.showBox = true
		  break;
		case 10000:
		  this.timeoutScore = val;
		  this.text = "Got a tenthousand";
		  this.showBox = true;
		  break;
	  }
  }
	  

  update() {
  	
  	this.scoreCheck();
  }

  render(ctx) {
	if(this.showBox){
		ctx.save();
		this.drawBox(ctx);
		ctx.restore();
	}
	if(this.timeoutScore >= this.timeoutScore+100){ 
	  this.showBox = false;
	  ctx.clearCanvas();
	}
	
  }
}
