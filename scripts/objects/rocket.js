'use strict';

// Rocket object
function Rocket(startPoint, side, direction) {

    var state = window.game_state;

    this.currPoint = $.extend(true, {}, startPoint);
    this.distance = 1000;
    this.startPoint = startPoint;
    this.speed = 35;
    this.direction = direction;

    this.damage = 100;

    // collision box
    this.width = 20;
    this.height = 7;

    this.reapMe = false;
    this.type = side + "_shot";

    this.draw = function (ctx) {
        if (this.currPoint.X - this.startPoint.X >= this.distance || this.startPoint.X - this.currPoint.X >= this.distance) {
            this.reapMe = true;
        } else {
            // Draw smoke
            var smoke = new Smoke(new Point(this.currPoint.X, this.currPoint.Y + 2));
            state.drawObjects.push(smoke);

            // Draw missle
            if (this.direction == 'right') {
                this.currPoint.X = this.currPoint.X + this.speed;
                ctx.drawImage(gameImages['rocket1'], this.currPoint.X, this.currPoint.Y);
            } else if (this.direction == 'left') {
                this.currPoint.X = this.currPoint.X - this.speed;
                ctx.drawImage(gameImages['rocket2'], this.currPoint.X, this.currPoint.Y);
            }
        }
    }
}
