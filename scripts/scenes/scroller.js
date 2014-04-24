'use strict';

function Scroller(element) {

    var me = this;

    var state = window.game_state;
    state.reset();

    state.ctx.save();

    var currY = 620;
    var wait = 100;

    var dom_game = document.getElementById('game');

    this.main_loop_interval = null;

    var completion_resolve = null;

    this.draw = function () {
        // clear canvas
        state.ctx.clearRect(state.camera.X, state.camera.Y, dom_game.offsetWidth, dom_game.offsetHeight);

        // create background
        state.ctx.drawImage(gameImages[element.background], state.camera.X, state.camera.Y);

        // Draw text
        state.ctx.font = "bolder 12pt 'Bitstream Vera Sans Mono'";
        state.ctx.textAlign = 'center';

        var i = 0;
        while (i < element.text.length) {
            // Draw shadow
            state.ctx.fillStyle = 'black';
            state.ctx.fillText(element.text[i], 401, currY + 1 + (i * 24));

            // Draw text
            state.ctx.fillStyle = 'white';
            state.ctx.fillText(element.text[i], 400, currY + (i * 24));

            i += 1;
        }

        if (currY > element.stop) {
            currY -= 1;
        } else {
            if (wait > 0) {
                wait -= 1;
            } else {
                exit_scroller();
            }
        }

        // Cancel when the user pushes ctrl
        if (kbd.ctrl == true) {
            kbd.ctrl = false; // Force the user to press the key again.
            exit_scroller();
        }

        function exit_scroller() {
            clearInterval(me.main_loop_interval);

            completion_resolve();

            // Decide what function gets execution.
            // if (inSystem == false) {
            //     handle_next();
            // } else {
            //     // TODO: go to next scene in system
            // }
        }
    }

    this.main_loop = function () {
        return new Promise(function(resolve, reject){
            completion_resolve = resolve;

            me.draw();
            me.main_loop_interval = setInterval(function() {
                me.draw();
            }, 40);
        });
    }
}
