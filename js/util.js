// util.js
//
// A module of utility functions, with no private elements to hide.
// An easy case; just return an object containing the public stuff.

const util = {

  // RANGES
  // ======
  clampRange: (value, lowBound, highBound) => {
    let val = value;
    if (value < lowBound) {
      val = lowBound;
    } else if (value > highBound) {
      val = highBound;
    }
    return val;
  },

  wrapRange: (value, lowBound, highBound) => {
    let val = value;
    while (value < lowBound) {
      val += (highBound - lowBound);
    }
    while (value > highBound) {
      val -= (highBound - lowBound);
    }
    return val;
  },

  isBetween: (value, lowBound, highBound) => {
    if (value < lowBound) { return false; }
    if (value > highBound) { return false; }
    return true;
  },


  // RANDOMNESS
  // ==========

  randRange: (min, max) => (min + Math.random() * (max - min)),


  // MISC
  // ====

  square: x => x * x,

  // DISTANCES
  // =========

  distSq: (x1, y1, x2, y2) => this.square(x2 - x1) + this.square(y2 - y1),

  wrappedDistSq: (x1, y1, x2, y2, xWrap, yWrap) => {
    let dx = Math.abs(x2 - x1);
    let dy = Math.abs(y2 - y1);
    if (dx > xWrap / 2) dx = xWrap - dx;
    if (dy > yWrap / 2) dy = yWrap - dy;
    return this.square(dx) + this.square(dy);
  },


  // CANVAS OPS
  // ==========

  clearCanvas: (ctx) => {
    const prevfillStyle = ctx.fillStyle;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = prevfillStyle;
  },

  strokeCircle: (ctx, x, y, r) => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();
  },

  fillCircle: (ctx, x, y, r) => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  },

  fillBox: (ctx, x, y, w, h) => {
    ctx.fillRect(x, y, w, h);
  },

  // Calculates subcoordinates for spritesheet
  getSubCoordinates: (sprite, spriteCount, rows, cols) => {
    const w = sprite.width;
    const h = sprite.height;

    const cellWidth = w / cols;
    const cellHeight = h / rows;

    const cellX = spriteCount % cols;
    const cellY = Math.floor(spriteCount / cols);

    return {
      subX: cellX * cellWidth,
      subY: cellY * cellHeight,
      width: cellWidth,
      height: cellHeight
    };
  },

  playAudio: (url, volume = 1, loop) => {
    const audio = new Audio();
    audio.src = url;
    audio.volume = volume;
    audio.loop = loop;
    audio.play();
    return audio;
  },

  map: function(x, a, b, c, d) {
    return (x-a)/(b-a)*(d-c) + c;
  },

  drawImage(ctx, image, x, y, scale) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.translate(-x, -y);
    ctx.drawImage(image, x, y);
    ctx.restore();
  }
};
