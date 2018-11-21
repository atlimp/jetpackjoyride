// GENERIC RENDERING

var g_doClear = true;
var g_doBox = false;
var g_undoBox = false;
var g_doFlipFlop = false;
var g_doRender = true;

var g_frameCounter = 1;

var TOGGLE_RENDER = 'R'.charCodeAt(0);

function render(ctx) {

    // Process various option toggles
    //
    if (eatKey(TOGGLE_RENDER)) g_doRender = !g_doRender;

    // I've pulled the clear out of `renderSimulation()` and into
    // here, so that it becomes part of our "diagnostic" wrappers
    //
    util.clearCanvas(ctx);


    // The core rendering of the actual game / simulation
    //
    if (g_doRender) renderSimulation(ctx);

    ++g_frameCounter;
}
