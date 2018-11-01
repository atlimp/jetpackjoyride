const NOMINAL_THRUST = -0.4;

class Player {

  constructor(sprite) {
    this.x = g_canvas.width / 2;
    this.y = g_canvas.height / 2;
    this.velY = 0;
    this.sprite = sprite;
    this.KEY_THRUST = keyCode('W');
    this.gravity = 0.12;
  }

  render(ctx) {
    this.sprite.drawCentredAt(ctx, this.x, this.y);
  }

  update(du) {
    let thrust = this.computeThrust();

    thrust += this.gravity;

    this.applyAccel(thrust, du);
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
