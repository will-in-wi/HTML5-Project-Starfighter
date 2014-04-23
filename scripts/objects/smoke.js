'use strict';

// Smoke
function Smoke(startPoint) {

    var state = window.game_state;

    this.currPoint = startPoint;

    this.step = 1;

    this.reapMe = false;
    this.type = "no_explode";

    this.draw = function (ctx) {
        var img = new Image();
        switch (this.step) {
            case 1:
            case 2:
                state.ctx.fillStyle = 'white';
                state.ctx.fillRect(this.currPoint.X, this.currPoint.Y, 3, 3);
                break;
            case 3:
            case 4:
                state.ctx.fillStyle = 'yellow';
                state.ctx.fillRect(this.currPoint.X, this.currPoint.Y, 3, 3);
                break;
            case 5:
            case 6:
                state.ctx.fillStyle = 'orange';
                state.ctx.fillRect(this.currPoint.X, this.currPoint.Y, 3, 3);
                break;
            case 7:
            case 8:
                state.ctx.fillStyle = 'red';
                state.ctx.fillRect(this.currPoint.X, this.currPoint.Y, 3, 3);
                break;
            default:
                this.reapMe = true;
        }
        this.step = this.step + 1;
    }
}
