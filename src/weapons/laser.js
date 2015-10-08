'use strict';

// Laser secondary weapon
function Laser() {

    var state = window.game_state;

    // Allows the laser to overheat
    this.heat = 0;
    this.maxHeat = 1000;

    this.fire = function(direction, currPoint) {
        if (this.heat > this.maxHeat) {
            this.heat -= 5;
        } else if (this.heat == this.maxHeat) {
            this.heat = 1400;
        } else {
            var shot = new Shot(new Point(currPoint.X, currPoint.Y + 4), gameImages['plasmaRed'], 'good', direction, 1);
            state.drawObjects.push(shot);

            // Shot was just created, make fire sound.
            playSound("data/sound/plasma");

            this.heat += 10;
        }
    }

    this.nofire = function() {
        if (this.heat > 0) {
            this.heat -= 5;
        }
    }

    this.drawStatus = function() {
        state.ctx.fillStyle = 'white';
        state.ctx.fillText('Heat', camera.X + 400, camera.Y + 560);

        if (this.heat > 1000) {
            state.ctx.fillStyle = 'red';
        } else {
            state.ctx.fillStyle = 'green';
        }
        state.ctx.fillRect(camera.X + 445, camera.Y + 548, this.heat / 10, 15);
    }
}
