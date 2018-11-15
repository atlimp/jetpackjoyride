class CounterManager{
  constructor() {
	   this.counters = [];
	   this.speedOfCount = 1;
  }

  createCounter() {
	  this.counters.push(new Counter());
  }
  
  update(du) {
	  for(let i = 0; i < this.counters.length; i++) {
		  this.counters[i].update(du, this.speedOfCount);
	  }
  }
  
  render(ctx) {
	  this.counters[0].setPos(g_canvas.width/2, 30);
	  this.counters[1].setPos(10, 110);
	  for(let i = 0; i < this.counters.length; i++) {
		  this.counters[i].render(ctx);
	  }
  }

}
