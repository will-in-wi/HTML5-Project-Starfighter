import Events from 'events.js'

// Handles keystrokes
class Keyboard {
  constructor() {
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
}

// TODO: Don't initialize code anywhere other than main.js.
var kbd = new Keyboard();

document.onkeydown = function(event) {
  switch(event.which) {
    case 40: // Down arrow
      if (kbd.downArrow == false) {
        kbd.events.trigger('downArrow');
      }
      kbd.downArrow = true;
      break;
    case 39: // Right arrow
      if (kbd.rightArrow == false) {
        kbd.events.trigger('rightArrow');
      }
      kbd.rightArrow = true;
      break;
    case 38: // Up arrow
      if (kbd.upArrow == false) {
        kbd.events.trigger('upArrow');
      }
      kbd.upArrow = true;
      break;
    case 37: // Left arrow
      if (kbd.leftArrow == false) {
        kbd.events.trigger('leftArrow');
      }
      kbd.leftArrow = true;
      break;
    case 70: // Ctrl - Fire
      if (kbd.ctrl == false) {
        kbd.events.trigger('ctrl');
      }
      kbd.ctrl = true;
      break;
    case 68: // Shift - Secondary weapon
      if (kbd.shift == false) {
        kbd.events.trigger('shift');
      }
      kbd.shift = true;
      break;
  }
  //alert("key pressed: " + event.which);
}

document.onkeyup = function(event) {
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
    case 70: // Ctrl - Fire
      kbd.ctrl = false;
      break;
    case 68: // Shift - Secondary weapon
      kbd.shift = false;
      break;
  }
}

export default kbd;
