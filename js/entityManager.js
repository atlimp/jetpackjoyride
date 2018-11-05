class EntityManager {

  constructor() {
    this.obstacles = [];
    this.KILL_ME_NOW = -1;
  }

  createPlayer(images) {
    this.player = new Player({
      jump: new Sprite(images.jump, 0.2),
      stand: new Sprite(images.stand, 0.2)
    });
  }

  createRandomObstacle() {
    this.obstacles.push(new Zapper());
  }

  render(ctx) {
    this.obstacles.forEach(obstacle => obstacle.render(ctx));
    this.player.render(ctx);
  }

  update(du) {
    for (let i = this.obstacles.length - 1; i >= 0; i--) {

      if (this.obstacles[i].update(du) === this.KILL_ME_NOW) {
        this.obstacles.splice(i, 1);
      }

    }
    this.player.update(du);
  }
}
