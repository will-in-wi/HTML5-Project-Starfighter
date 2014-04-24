'use strict';

// Missles
function Missle() {

    var state = window.game_state;

    // Tracks number of frames since last shot.
    this.speed = 10;
    this.shotState = this.speed;

    // Missle numbers
    this.maxMissles = 10;
    this.missles = 3;

    this.fire = function(direction, currPoint) {
        if (this.shotState < this.speed) {
            this.shotState += 1;
        } else {
            // Check number of shots
            if (this.missles > 0) {
                this.missles -= 1;
                var shotLoc = $.extend(true, {}, currPoint);
                shotLoc.Y += 3;
                var missle = new Rocket(shotLoc, "good", direction);
                playSound('data/sound/missile');
                state.drawObjects.push(missle);

                this.shotState = 1;
            }
        }
    }

    // Executed once per frame. Handles repeat speed.
    this.nofire = function() {
        if (this.shotState < this.speed) {
            this.shotState += 1;
        } else {
            this.shotState = this.speed;
        }
    }

    this.drawStatus = function() {
        state.ctx.fillStyle = 'white';
        state.ctx.fillText('Rockets: ' + this.missles, state.camera.X + 400, state.camera.Y + 560);
    }
}
