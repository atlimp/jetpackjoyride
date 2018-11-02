class Zapper extends Obstacle {

  constructor(sprite) {
    super(sprite);
    this.rotation = util.randRange(-Math.PI / 2, Math.PI / 2);
    this.spacing = util.randRange(100, 150);
  }

}
