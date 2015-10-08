import Point from 'point.js';

// This function plays a sound file. It assumes that there is a file of type
// OGG and mp3 in the same location.
function playSound(res) {
    var sfx = new Audio();
    if (sfx.canPlayType("audio/mpeg")) {
        sfx.src = res + ".mp3";
    } else if (sfx.canPlayType("audio/ogg")) {
        sfx.src = res + ".ogg";
    }
    sfx.play();
}

// Shows the infobox with a face
function talkBox(person, text, loc) {

    var state = window.game_state;

    state.ctx.strokeStyle = 'white';
    state.ctx.strokeRect(loc.X, loc.Y, 600, 75);

    var textLoc;

    state.ctx.textAlign = 'start';
    state.ctx.font = "bolder 12pt 'Bitstream Vera Sans Mono'";
    if (person == 'none') {
        state.ctx.fillStyle = 'black';
        state.ctx.fillRect(loc.X, loc.Y, 600, 75);
        textLoc = new Point(loc.X + 10, loc.Y + 10);

    } else {
        state.ctx.fillStyle = 'blue';
        state.ctx.fillRect(loc.X, loc.Y, 600, 75);
        textLoc = new Point(loc.X + 60, loc.Y + 10);
        state.ctx.drawImage(gameImages['face_' + person], loc.X + 5, loc.Y + 5);
    }

    // Split up text into an array of lines

    var lineLength = 0;
    if (person == 'none') {
        lineLength = 600;
    } else {
        lineLength = 540;
    }

    var talk = split_text(text, lineLength);

    // Draw lines
    var i = 0;
    while (i < talk.length) {
        // Draw shadow
        state.ctx.fillStyle = 'black';
        state.ctx.fillText(talk[i], textLoc.X, textLoc.Y + 11 + (i * 20));

        // Draw text
        state.ctx.fillStyle = 'white';
        state.ctx.fillText(talk[i], textLoc.X, textLoc.Y + 10 + (i * 20));

        i += 1;
    }
}

function split_text(text, len) {

    var state = window.game_state;

    // Start by creating an array of words:
    var words = text.split(" ");
    var talk = [];

    // Then loop, adding a new word each time until the limit is reached.
    var currString = words[0];
    var i = 1;
    while (i < words.length) {
        var textWidth = state.ctx.measureText(currString + ' ' + words[i]);
        if (textWidth.width < len) {
            currString = currString +  ' ' + words[i];
        } else {
            talk.push(currString);
            currString = words[i];
        }

        i += 1;
    }

    // Clean up
    talk.push(currString);

    return talk;
}

export default talkBox;
