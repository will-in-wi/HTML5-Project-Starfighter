'use strict';

// Normal shot for good guys.
function NormalGoodShot() {

    var state = window.game_state;

    // Number of shots in blast
    this.numShots = 1;

    // Powerups
    this.possibleSpeed = 5;
    this.speed = 1; // real speed = 9 - speed.
    this.possibleShots = 5;
    this.shots = 1; // Number of shots at a time.
    this.possibleDamage = 5;
    this.damage = 1; // real damage = damage * 10;

    // Tracks number of frames since last shot.
    this.shotState = this.speed;

    // Plasma numbers
    this.maxPlasmaShots = 100;
    this.plasmaShots = 0;

    // Spread or not
    this.spread = false;

    this.fire = function(direction, currPoint) {
        if (this.shotState < 8 - this.speed) {
            this.shotState += 1;
        } else {
            // Check number of plasmas
            if (this.plasmaShots > 0) {
                this.plasmaShots -= 1;
            } else {
                this.speed = 1;
                this.shots = 1;
                this.damage = 1;
            }

            var shotLoc = $.extend(true, {}, currPoint);
            shotLoc.Y += 3;
            for (var i = 0; i <= this.shots - 1; i = i + 1) {
                var newPoint = new Point(shotLoc.X, shotLoc.Y + (i*3));
                var shot = new Shot(newPoint, gameImages["plasmaGreen"], "good", direction, this.damage * 10);
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
