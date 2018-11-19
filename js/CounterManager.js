class CounterManager{
  constructor() {
    this.counters = [];
    this.maxScore = 0;
  }

  clockStat(){
    let sec = this.counters[0].secStat();
    let min = this.counters[0].minuteStat();
    return {sec, min};
  }

  createCounter() {
    this.counters.push(new Counter());
  }

  update(du) {
    for(let i = 0; i < this.counters.length; i++) {
      let counter =  this.counters[i]
      counter.update(du);
    }
  }

  render(ctx) {
    this.counters[0].setPos(g_canvas.width/2, 30);
    for(let i = 0; i < this.counters.length; i++) {
      this.counters[i].render(ctx);
    }
  }

  dead(){

    for(let i = 0; i < this.counters.length; i++) {
      this.counters[i].count = 0;
    }
  }
}
