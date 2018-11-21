/***
 * PlayerBullet class
 * Creates bullet sprites
 */

class PlayerBullet extends Entity {
  constructor(sprite, playerX, playerY) {
    super()
    this.cx = playerX;
    this.cy = playerY;
    this.velX = 5;
    // Gets sprite as parameter
    this.sprite = sprite;
    // Bullet moves in a curve, Mario style
    this.angle = (Math.PI)/4;
    this.ampl = 150;
    this.freq = 0.025;
    this.originalY = this.cy + Math.sin(Math.PI / 4) * this.ampl;
    // Rotation on bullet
    this.rotation = 0;
    this.toRad = Math.PI/180;

    // halfWidth & halfHeight for spatial manager
    this.halfWidth = this.sprite ? (this.sprite.width * this.sprite.scale) / 2: 25;
    this.halfHeight = this.sprite ? (this.sprite.height * this.sprite.scale) / 2 : 25;

  }

  // Render bullet, rotation
  render(ctx) {
    ctx.save();

    ctx.translate(this.cx, this.cy);
    ctx.rotate(this.rotation * this.toRad);
    ctx.translate(-this.cx, -this.cy);
    this.sprite.drawCentredAt(ctx, this.cx, this.cy);

    ctx.restore();
  }

  // Update bullet
  update(du) {
    // Unregister from spatial manager
    spatialManager.unregister(this);

    // Run splice in entity manager if entity is dead
    if (this.isDead) return entityManager.KILL_ME_NOW;

    // Constant velocity on x-axis
    this.cx += this.velX * du;
    // Sin curve on y-axis
    this.cy = (
      this.originalY -
      Math.sin(this.angle) *
      this.ampl
    );

    // Angle on sin curve incremented 0.025 each du
    this.angle += this.freq;

    // Bullet descending down y-axis
    this.originalY += du;

    // Fast rotation
    this.rotation += 25;
    this.rotation = this.rotation > 360 ? 0 : this.rotation;

    // If bullet falls down to the bottom of canvas, kill it
    if (this.cy > g_canvas.height - this.halfHeight) this.kill();

    this.checkForCollission();

    // Register with spatial manager
    spatialManager.register(this);
  }

  // Check for collission
  checkForCollission() {

    const hit = spatialManager.findEntityInRange({
      x: this.cx,
      y: this.cy,
      halfWidth: this.halfWidth,
      halfHeight: this.halfHeight
    });

    // If there is collission check if entity should die
    if (hit) {
      const canTakeBullet = hit.takeBulletHit;

      if (canTakeBullet) {
        canTakeBullet.call(hit);
        this.kill();
      }
    }
  }

  // Get position of bullet
  getPos() {
    return { x: this.cx, y: this.cy };
  }

  // Get dimension of bullet
  getDimensions() {
    return { halfWidth: this.halfWidth, halfHeight: this.halfHeight };
  }
}
