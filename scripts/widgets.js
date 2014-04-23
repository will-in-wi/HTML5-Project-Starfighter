'use strict';

var Widgets = {
    header_box : function(loc, color, headerText, bodyText) {
        var state = window.game_state;

        var boxWidth = 500;
        var boxHeight = 150;
        var titleHeight = 20;

        // Title Background
        state.ctx.fillStyle = color.hex();
        state.ctx.fillRect(loc.X, loc.Y, boxWidth, titleHeight);

        // Body Background
        state.ctx.fillStyle = color.transform(0.50).hex();
        state.ctx.fillRect(loc.X, loc.Y + titleHeight, boxWidth, boxHeight - titleHeight);

        // Main box.
        state.ctx.strokeStyle = '#FFFFFF';
        state.ctx.strokeRect(loc.X, loc.Y, boxWidth, boxHeight);

        // Bottom of title
        state.ctx.beginPath();
        state.ctx.moveTo(loc.X,loc.Y + titleHeight);
        state.ctx.lineTo(loc.X + boxWidth,loc.Y + titleHeight);
        state.ctx.stroke();

        // Title Text
        Widgets.text(loc.move(5, 15), headerText);

        // Body text
        for (var i = 0; i < bodyText.length; i++) {
            Widgets.text(loc.move(15, 45 + (20 * i)), bodyText[i]);
        };
    },

    text : function (loc, text) {
        var state = window.game_state;

        state.ctx.textAlign = 'left';

        // Draw shadow
        state.ctx.fillStyle = 'black';
        state.ctx.fillText(text, loc.X, loc.Y + 1);
        // Draw text
        state.ctx.fillStyle = 'white';
        state.ctx.fillText(text, loc.X, loc.Y);
    }
};
