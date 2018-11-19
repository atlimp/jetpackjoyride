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
	ctx.stroke();
  }
	  
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