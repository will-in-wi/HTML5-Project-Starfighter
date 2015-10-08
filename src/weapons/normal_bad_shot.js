'use strict';

// Normal shot for bad guys.
function NormalBadShot() {

    var state = window.game_state;

    // Number of shots in blast
    this.numShots = 1;

    // Powerups
    this.speed = 1; // real speed = 9 - speed.
    this.shots = 1; // Number of shots at a time.
    this.damage = 5; // damage done

    // Tracks number of frames since last shot.
    this.shotState = this.speed;

    // Spread or not
    this.spread = false;

    this.fire = function(direction, currPoint) {
        if (this.shotState < 8 - this.speed) {
            this.shotState += 1;
        } else {
            var shotLoc = currPoint.clone();
            shotLoc.Y += 3;
            for (var i = 0; i <= this.shots - 1; i = i + 1) {
                var newPoint = new Point(shotLoc.X, shotLoc.Y + (i*3));
                var shot = new Shot(newPoint, gameImages["plasmaRed"], "bad", direction, this.damage);
                state.drawObjects.push(shot);
            }
            // Shot was just created, make fire sound.
            playSound("data/sound/plasma");
            this.shotState = 1;
        }
    }

    // Executed once per frame. Handles repeat speed.
    this.nofire = function() {
        if (this.shotState < 8 - this.speed) {
            this.shotState += 1;
        } else {
            this.shotState = 8 - this.speed;
        }
    }
}
