// ==============
// MOUSE HANDLING
// ==============

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

let g_mouseX = 0,
    g_mouseY = 0;

function handleMouse(evt) {

    g_mouseX = evt.clientX - g_canvas.offsetLeft;
    g_mouseY = evt.clientY - g_canvas.offsetTop;

    // If no button is being pressed, then bail
    const button = evt.buttons === undefined ? evt.which : evt.buttons;
    if (!button) return;

    if (useMenu) menu.whichButton(g_mouseX, g_mouseY);
}

// Handle "down" and "move" events the same way.
window.addEventListener("mousedown", handleMouse);
window.addEventListener("mousemove", handleMouse);
