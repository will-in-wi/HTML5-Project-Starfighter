'use strict';

// Charge up cannon
function ChargeCannon() {

    var state = window.game_state;

    // Amount that has been charged.
    this.charged = 0;
    this.maxCharge = 100;

    // remember last fire values.
    this.direction = 'left';
    this.currPoint;

    this.fire = function(direction, currPoint) {
        if (this.charged < this.maxCharge) {
            this.charged += 1;
        }

        // Store for usage by the nofire function.
        this.direction = direction;
        this.currPoint = currPoint;
    }

    this.nofire = function() {
        if (this.charged > 0) {
            // Fire
            // Several columns with several randomly distributed rows each.
            for (var i = 1; i <= this.charged; i = i + 1) { // max 15 columns
                var currCol = Math.floor(i / 7);
                var shot = new Shot(new Point(this.currPoint.X - (currCol * 6), this.currPoint.Y + Math.floor(Math.random()*10)), gameImages['greenDir'], 'good', this.direction, 1);
                state.drawObjects.push(shot);
            }
            playSound('data/sound/plasma3');
            this.charged = 0;
        }
    }

    this.drawStatus = function() {
        state.ctx.fillStyle = 'white';
        state.ctx.fillText('Charge', state.cameraX + 400, state.cameraY + 560);

        if (this.charged > 66) {
            state.ctx.fillStyle = 'red';
        } else {
            state.ctx.fillStyle = 'green';
        }
        state.ctx.fillRect(state.cameraX + 455, state.cameraY + 548, this.charged, 15);
    }
}
