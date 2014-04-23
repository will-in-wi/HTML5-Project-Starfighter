'use strict';

// Maintains game state at all times.
// Main menu hands off control to this class which takes things from there.


// Advance to next top-level part of the game.
function handle_next() {
    var next = game_play.shift();

    Debug.log('Next stage: ' + next.type, Debug.type.info, 'Tracker');

    var scene = null;
    switch (next.type) {
        case 'scroller':
            scene = new Scroller(next);
            scene.main_loop();
            break;
        case 'cutscene':
            scene = new CutScene(next);
            scene.main_loop();
            break;
        case 'mission':
            var mission = new Mission(next);
            mission.start();
            break;
        default:
            console.log('Invalid story element: ' + next.type);
            return;
    }
}