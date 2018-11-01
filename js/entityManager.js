class EntityManager {

  constructor() {
    this.obstacles = [];
  }

  createPlayer(sprites) {
    this.player = new Player(sprites);
  }

  render(ctx) {
    this.obstacles.forEach(obstacle => obstacle.render(ctx));
    this.player.render(ctx);
  }

  update(du) {
    this.obstacles.forEach(obstacle => obstacle.update(du));
    this.player.update(du);
  }
}
