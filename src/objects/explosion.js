'use strict';

// Explosion
function Explosion(startPoint) {

    var state = window.game_state;

    this.currPoint = startPoint;

    this.step = 1;

    this.reapMe = false;
    this.type = "no_explode";

    this.draw = function () {
        var img = new Image();

        switch (this.step) {
            case 1:
                playSound("data/sound/explode");
                state.ctx.drawImage(gameImages["explode05"], this.currPoint.X, this.currPoint.Y);
                break;
            case 2:
                state.ctx.drawImage(gameImages["explode05"], this.currPoint.X, this.currPoint.Y);
                break;
            case 3:
            case 4:
                state.ctx.drawImage(gameImages["explode06"], this.currPoint.X, this.currPoint.Y);
                break;
            case 5:
            case 6:
                state.ctx.drawImage(gameImages["explode07"], this.currPoint.X, this.currPoint.Y);
                break;
            case 7:
            case 8:
                state.ctx.drawImage(gameImages["explode08"], this.currPoint.X, this.currPoint.Y);
                break;
            default:
                this.reapMe = true;
        }

        this.step = this.step + 1;
    }
}
