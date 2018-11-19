class Menu  {

  constructor() {
	this.menuShow = false;
	
	this.menuText = "Pause";
	
	this.x = 150;
	this.y = 15;
	
	this.w = g_canvas.width - this.x*2;
	this.h = g_canvas.height - this.y*2;
  }
  
  show() {
	this.menuShow = !this.menuShow;
  }
  
  drawMenu(ctx) {

	ctx.fillStyle = "#000";
	util.fillBox(ctx, this.x, this.y, this.w, this.h)
	ctx.fillStyle = "#FFF";
	ctx.fillText(this.menuText, this.w-this.x+15, this.y+30);
	//this.drawButton(ctx);
	ctx.stroke();
  }
  
  /*drawButton(ctx){
	util.fillBox(ctx, this.w-this.x, this.h/2-40, 100, 80);
	ctx.fillStyle = "#000";
	ctx.fillText("Unpause", 360, 290);
  }*/
	  
  update() { 	
  	
  }

  render(ctx) {
    if(this.menuShow) {  
	 ctx.save();
	 this.drawMenu(ctx)
	 ctx.restore();
	}
  }
}