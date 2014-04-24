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

    this.events = new Events();
}

// TODO: Don't initialize code anywhere other than main.js.
window.kbd = new Keyboard();
$(document).keydown(function(event) {
    switch(event.which) {
        case 40: // Down arrow
            kbd.downArrow = true;
            kbd.events.trigger('downArrow');
            break;
        case 39: // Right arrow
            kbd.rightArrow = true;
            kbd.events.trigger('rightArrow');
            break;
        case 38: // Up arrow
            kbd.upArrow = true;
            kbd.events.trigger('upArrow');
            break;
        case 37: // Left arrow
            kbd.leftArrow = true;
            kbd.events.trigger('leftArrow');
            break;
        case 70: // Ctrl - Fire
            kbd.ctrl = true;
            kbd.events.trigger('ctrl');
            break;
        case 68: // Shift - Secondary weapon
            kbd.shift = true;
            kbd.events.trigger('shift');
            break;
    }
    //alert("key pressed: " + event.which);
});

$(document).keyup(function(event) {
    switch(event.which) {
        case 40: // Down arrow
            kbd.downArrow = false;
            kbd.events.trigger('downArrow');
            break;
        case 39: // Right arrow
            kbd.rightArrow = false;
            kbd.events.trigger('rightArrow');
            break;
        case 38: // Up arrow
            kbd.upArrow = false;
            kbd.events.trigger('upArrow');
            break;
        case 37: // Left arrow
            kbd.leftArrow = false;
            kbd.events.trigger('leftArrow');
            break;
        case 70: // Ctrl - Fire
            kbd.ctrl = false;
            kbd.events.trigger('ctrl');
            break;
        case 68: // Shift - Secondary weapon
            kbd.shift = false;
            kbd.events.trigger('shift');
            break;
    }
});
