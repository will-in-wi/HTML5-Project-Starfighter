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

        var textLoc;

        state.ctx.textAlign = 'start';
        state.ctx.font = "bolder 12pt 'Bitstream Vera Sans Mono'";
        // if (person == 'none') {
        //     state.ctx.fillStyle = 'black';
        //     state.ctx.fillRect(loc.X, loc.Y, 600, 75);
        //     textLoc = new Point(loc.X + 10, loc.Y + 10);

        // } else {
        //     state.ctx.fillStyle = 'blue';
        //     state.ctx.fillRect(loc.X, loc.Y, 600, 75);
        //     textLoc = new Point(loc.X + 60, loc.Y + 10);
        //     state.ctx.drawImage(gameImages['face_' + person], loc.X + 5, loc.Y + 5);
        // }

        // Split up text into an array of lines

        var lineLength = 600;

        // var talk = split_text(text, lineLength);

        // Draw lines
        var i = 0;
        // while (i < talk.length) {
        //     // Draw shadow
        //     state.ctx.fillStyle = 'black';
        //     state.ctx.fillText(talk[i], textLoc.X, textLoc.Y + 11 + (i * 20));

        //     // Draw text
        //     state.ctx.fillStyle = 'white';
        //     state.ctx.fillText(talk[i], textLoc.X, textLoc.Y + 10 + (i * 20));

        //     i += 1;
        // }
    }

    this.main_loop = function () {
        // Only one image, so just mock the main_loop.
        me.draw();
    }
}
