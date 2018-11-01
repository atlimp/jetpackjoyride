const NOMINAL_THRUST = -0.4;

class Player {

  constructor(sprites) {
    this.x = g_canvas.width / 2;
    this.y = g_canvas.height / 2;
    this.velY = 0;
    this.sprites = sprites;
    this.KEY_THRUST = keyCode('W');
    this.gravity = 0.12;
    this.halfHeight = (this.sprites.jump.height * this.sprites.jump.scale) / 2;
  }

  render(ctx) {
    if (this.velY !== 0 || this.y < g_canvas.height - this.halfHeight)
      this.sprites.jump.drawCentredAt(ctx, this.x, this.y);
    else
      this.sprites.stand.drawCentredAt(ctx, this.x, this.y);
  }

  update(du) {
    let thrust = this.computeThrust();

    thrust += this.gravity;

    this.applyAccel(thrust, du);

    this.handleEdges();
  }

  handleEdges() {
    if (this.y < this.halfHeight) {
      this.y = 0 + this.halfHeight;
      this.velY = 0;
    } else if (this.y > g_canvas.height - this.halfHeight) {
      this.y = g_canvas.height - this.halfHeight;
      this.velY = 0;
    }
  }

  computeThrust() {
    let thrust = 0;
    if (keys[this.KEY_THRUST]) thrust += NOMINAL_THRUST;
    return thrust;
  }

  applyAccel(accelY, du) {
    const oldVelY = this.velY;

    this.velY += accelY * du;

    let avgVelY = (oldVelY + this.velY) / 2;

    this.y += avgVelY * du;
  }
}