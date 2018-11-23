class Achievement  {

  constructor() {
    this.completed = [];

    this.box_W = 200;
    this.box_H = 75;

    this.showBox = false;

    this.text = "This is the text";

    this.timeoutScore = 0;
    this.currentTime = 0;

    this.numCar = 0;
    this.numDeath = 0;
    this.jetPackUse = 0;

    this.jetFuel = 1;
  }

  toSec(min) {
    /*Converts minutes to seconds*/
    return min*60;
  }

  updateCar() {
    /*Update number of times a car is used, does not count if you
    are already using a car when fuel is filled*/
    this.numCar++;
  }

  incDeath(){
    //Checks number of deaths
    this.numDeath++;
  }

  incJetPack(){
    this.jetPackUse++;
  }

  currentJetFuel(fuel) {
    this.jetFuel = fuel;
  }
  
  displayAlign(text, x, y){
	/*
	checks if the text length is longer than the box and aligns it
	*/
	const oldLength = text.length;
	let exractedText = "";
	let x = text.length;
	console.log("Start Loop")
	for(x; x > 0; x--){
	  if(text[x] === " ") extractedText += text.slice(x+1, text.length) + " ";
	  if(text.length < oldLength){
		ctx.fillText(text, x+15, y+40);
		ctx.fillText(extractedText, x, y+40);
		console.log("End loop");
		return;
	  }
	}
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
	
	const textLength = ctx.measureText(this.text);
	console.log(textLength);
	if(textLength > this.box_W) this.displayAlign(this.text, x, y);
	else ctx.fillText(this.text, x+15, y+40);
    
	ctx.stroke();
  }

  showBoxAchievementTime(text, time) {
    //Cant do overflow so had to make two
    this.timeoutScore = time + 5;
    this.text = text;
    this.showBox = true;
  }

  showBoxAchievement(index, text, time){
    this.timeoutScore = time + 5;
    this.text = text;
    this.showBox = true;
    this.completed[index] = true;
  }

  achievementCheck() {
    /*Checks the current game stats to see if an achievement
    has been completeded and prompts the user*/
    const clock = countManager.clockStat();
    //We must parse clock since we are fetching strings
    const sec = parseInt(clock.sec);
    const min = parseInt(clock.min);
    this.currentTime = sec + this.toSec(min);

    switch(this.currentTime) {
      case g_startTimer+10:
      this.showBoxAchievementTime("Survive 10 sec!", this.currentTime);
      break;
      case g_startTimer+60:
      this.showBoxAchievementTime("Survive 1 minutes!", this.currentTime);
      break;
      case g_startTimer+this.toSec(5):
      this.showBoxAchievementTime("Survive 5 minutes!", this.currentTime);
      break;
      case g_startTimer+this.toSec(10):
      this.showBoxAchievementTime("Make it to the Vínbúðinn", this.currentTime);
      main.gameOver();
      break;
    }

    switch(this.numCar){
      case 1:
      if(this.completed[0] != true) {
        this.showBoxAchievement(0, "Travel in a car!", this.currentTime);
      }
      break;
      case 5:
      if(this.completed[1] != true) {
        this.showBoxAchievement(1, "Travel in a car 5 times!", this.currentTime);
      }
      break;
      case 10:
      if(this.completed[2] != true){
        this.showBoxAchievement(2, "Travel in a car 10 times!", this.currentTime);
      }
      break;
    }

    switch(this.numDeath){
      case 1:
      if(this.completed[3] != true) {
        this.showBoxAchievement(3, "Haha you died", this.currentTime);
      }
      break;
      case 5:
      if(this.completed[4] != true) {
        this.showBoxAchievement(4, "Cmon, you can do better?", this.currentTime);
      }
      break;
      case 10:
      if(this.completed[5] != true) {
        this.showBoxAchievement(5, "Really?", this.currentTime);
      }
      break;
    }

    switch(this.jetPackUse){
      case 1:
      if(this.completed[6] != true) {
        this.showBoxAchievement(6, "Get a refuel!", this.currentTime);
      }
      break;
      case 5:
      if(this.completed[7] != true) {
        this.showBoxAchievement(7, "Buy a gas tank", this.currentTime);
      }
    }

    if(this.jetFuel <= 0 && this.completed[8] != true){
      this.showBoxAchievement(8, "Empty your fuel", this.currentTime);
    }

  }

  update() {
    this.achievementCheck();
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
