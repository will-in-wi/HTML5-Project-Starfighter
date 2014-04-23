'use strict';

// Shot object
function Shot(startPoint, gfx, side, direction, damage) {

    var state = window.game_state;

    this.currPoint = $.extend(true, {}, startPoint);
    this.distance = 1000;
    this.gfx = gfx;
    this.startPoint = startPoint;
    this.speed = 25;
    this.direction = direction;

    this.damage = damage;

    // collision box
    this.width = gfx.width;
    this.height = gfx.height;

    this.reapMe = false;
    this.type = side + "_shot";

    // Shot was just created, make fire sound.
    //playSound("data/sound/plasma");

    this.draw = function () {
        if (this.direction == 'right') {
            this.currPoint.X = this.currPoint.X + this.speed;
        } else if (this.direction == 'left') {
            this.currPoint.X = this.currPoint.X - this.speed;
        }
        if (this.currPoint.X - this.startPoint.X >= this.distance || this.startPoint.X - this.currPoint.X >= this.distance) {
            this.reapMe = true;
        } else {
            state.ctx.drawImage(this.gfx, this.currPoint.X, this.currPoint.Y);
        }
    }
}
