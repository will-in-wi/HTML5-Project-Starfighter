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
            var ai = new AI(100, new Point(Math.random()*800, Math.random()*600));
            var weapon = new NormalBadShot();
            var badguy = new EnemyShip(ai, element.badGuys[i].ship, 50, weapon);
            state.drawObjects.push(badguy);
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
