'use strict';

function Mission(element) {

    var me = this;

    this.element = element;

    this.display_briefing = function () {
        var briefing = new Briefing(this.element);
        return briefing.main_loop();
    }

    this.start_game = function () {
        var state = window.game_state;
        state.reset();
        state.ctx.restore();

        // Add the firefly
        state.firefly = new Firefly(new Point(100, 100));
        state.drawObjects.push(state.firefly);

        // Add baddies.
        // TODO: Add based on time.
        for (var i = 0; i < element.badGuys.length; i++) {
            state.drawObjects.push(Ships[element.badGuys[i].ship]());
        };

        var game = new Game();
        game.main_loop();
    }

    this.start = function () {
        this.display_briefing().done(function(){
            me.start_game();
        });
        // TODO: Handle starting the game once the mission is done.
    }
}
