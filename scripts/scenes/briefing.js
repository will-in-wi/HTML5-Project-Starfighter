'use strict';

function Briefing(element) {

    var me = this;

    var state = window.game_state;

    state.reset();
    state.ctx.restore();

    this.main_loop_interval = null;

    var completion_resolve = null;

    this.end_briefing = function() {
        clearInterval(me.main_loop_interval);
        completion_resolve();
    }

    this.draw = function () {

        var loc = new Point(150 + state.camera.X, 70);

        // Draw green background.
        Widgets.backgrounds.green_gradient();

        // Objectives
        var primaryObjectivesText = [];
        var secondaryObjectivesText = [];
        for (var i = 0; i < element.objectives.length; i++) {
            if (element.objectives[i].importance == 'primary') {
                primaryObjectivesText.push(element.objectives[i].title);
            } else {
                secondaryObjectivesText.push(element.objectives[i].title);
            }
        };

        // Primary Objectives
        var c1 = new Color(0, 117, 0);
        Widgets.header_box(loc, c1, 'Primary Objectives', primaryObjectivesText);

        // Secondary Objectives
        if (secondaryObjectivesText.length > 0) {
            var c2 = new Color(115, 117, 0);
            Widgets.header_box(loc.move(0, 160), c2, 'Secondary Objectives', secondaryObjectivesText);
        }

        var c2 = new Color(115, 117, 0);
        Widgets.header_box(loc.move(0, 320), c2, 'Additional Information', [element.additional_information]);

        Widgets.text(loc.move(120, 490), 'Press [F] or Fire to continue…');

        if (kbd.ctrl == true) { // End briefing.
            kbd.ctrl = false; // Force the user to press the key again.
            this.end_briefing();
        }
    }

    this.main_loop = function () {
        return new Promise(function(resolve, reject){
            completion_resolve = resolve;

            me.draw();

            me.main_loop_interval = setInterval(function() {
                // Looping for the keyboard.
                // TODO: Fix this to be event driven.
                me.draw();
            }, 40);
        });
    }
}
