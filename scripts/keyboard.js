'use strict';

// Handles keystrokes
function Keyboard() {
    // Down arrow = 40
    // Left arrow = 37
    // Right arrow = 39
    // Up arrow = 38
    // Ctrl = 17
    // Shift = 16

    this.downArrow = false;
    this.upArrow = false;
    this.rightArrow = false;
    this.leftArrow = false;
    this.ctrl = false;
    this.shift = false;
}

window.kbd = new Keyboard();
$(document).keydown(function(event) {
    switch(event.which) {
        case 40: // Down arrow
            kbd.downArrow = true;
            break;
        case 39: // Right arrow
            kbd.rightArrow = true;
            break;
        case 38: // Up arrow
            kbd.upArrow = true;
            break;
        case 37: // Left arrow
            kbd.leftArrow = true;
            break;
        case 17: // Ctrl - Fire
            kbd.ctrl = true;
            break;
        case 16: // Shift - Secondary weapon
            kbd.shift = true;
            break;
    }
    //alert("key pressed: " + event.which);
});

$(document).keyup(function(event) {
    switch(event.which) {
        case 40: // Down arrow
            kbd.downArrow = false;
            break;
        case 39: // Right arrow
            kbd.rightArrow = false;
            break;
        case 38: // Up arrow
            kbd.upArrow = false;
            break;
        case 37: // Left arrow
            kbd.leftArrow = false;
            break;
        case 17: // Ctrl - Fire
            kbd.ctrl = false;
            break;
        case 16: // Shift - Secondary weapon
            kbd.shift = false;
            break;
    }
});
