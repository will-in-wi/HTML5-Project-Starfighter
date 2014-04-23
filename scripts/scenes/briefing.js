'use strict';

function Briefing(element) {

    var me = this;

    var state = window.game_state;

    state.reset();
    state.ctx.restore();

    this.draw = function () {

        var loc = new Point(150 + state.cameraX, 70);

        // Draw green background.
        var grd = state.ctx.createLinearGradient(0,0,0,600);
        grd.addColorStop(0,"black");
        grd.addColorStop(0.5,"green");
        grd.addColorStop(1,"black");

        state.ctx.fillStyle = grd;
        state.ctx.fillRect(0,0,800,600);

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

        Widgets.text(loc.move(120, 490), 'Press [CTRL] or Fire to continue…');
    }

    this.main_loop = function () {
        // Only one image, so just mock the main_loop.
        me.draw();
    }
}
