let reqID = undefined;

let g_quit = false;

const main = {

  // "Frame Time" is a (potentially high-precision) frame-clock for animations
  _frameTime_ms : null,
  _frameTimeDelta_ms : null,

};

// Perform one iteration of the mainloop
main.iter = function(frameTime) {

  // Use the given frameTime to update all of our game-clocks
  this._updateClocks(frameTime);

  // Perform the iteration core to do all the "real" work
  this._iterCore(this._frameTimeDelta_ms);

  // Diagnostics, such as showing current timer values etc.
  this._debugRender(g_ctx);

  // Request the next iteration if needed
  if (!this._isGameOver) this._requestNextIteration();
  else{
    g_ctx.fillStyle = "#000";
    util.fillBox(g_ctx, 0, 0, g_canvas.width, g_canvas.height);
    g_ctx.fillStyle = "#FFF";
    g_ctx.textAlign = "center";
    g_ctx.fillText("Game over", g_canvas.width/2, g_canvas.height/2);
    window.setTimeout(() => {
      window.close();
    }, 3000);
  }

};

main._updateClocks = function (frameTime) {

  // First-time initialisation
  if (this._frameTime_ms === null) this._frameTime_ms = frameTime;

  // Track frameTime and its delta
  this._frameTimeDelta_ms = frameTime - this._frameTime_ms;
  this._frameTime_ms = frameTime;
};

main._iterCore = function (dt) {

  // Handle QUIT
  if (requestedQuit()) {
    this.gameOver();
    return;
  }

  gatherInputs();
  update(dt);
  render(g_ctx);
};

main._isGameOver = false;

main.gameOver = function () {
  this._isGameOver = true;
  console.log("gameOver: quitting...");
};

function requestedQuit() {
  return g_quit;
}

// Annoying shim for Firefox and Safari
window.requestAnimationFrame =
window.requestAnimationFrame ||        // Chrome
window.mozRequestAnimationFrame ||     // Firefox
window.webkitRequestAnimationFrame;    // Safari

// This needs to be a "global" function, for the "window" APIs to callback to
function mainIterFrame(frameTime) {
  main.iter(frameTime);
}

main._requestNextIteration = function () {
  // if (!reqID) {
  reqID = window.requestAnimationFrame(mainIterFrame);
  // }
};

// Mainloop-level debug-rendering

var TOGGLE_TIMER_SHOW = 'T'.charCodeAt(0);

main._doTimerShow = false;

main._debugRender = function (ctx) {

  if (eatKey(TOGGLE_TIMER_SHOW)) this._doTimerShow = !this._doTimerShow;

  if (!this._doTimerShow) return;

  var y = 350;
  ctx.fillText('FT ' + this._frameTime_ms, 50, y+10);
  ctx.fillText('FD ' + this._frameTimeDelta_ms, 50, y+20);
  ctx.fillText('UU ' + g_prevUpdateDu, 50, y+30);
  ctx.fillText('FrameSync ON', 50, y+40);
};

main.init = function () {

  // Grabbing focus is good, but it sometimes screws up jsfiddle,
  // so it's a risky option during "development"
  //
  //window.focus(true);

  // We'll be working on a black background here,
  // so let's use a fillStyle which works against that...
  //
  g_ctx.fillStyle = "white";

  if (reqID) {
    window.cancelAnimationFrame(reqID);
    reqID = undefined;
  }


  this._requestNextIteration();
};
