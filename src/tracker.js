import Debug from 'debug.js';
import Scroller from 'scenes/scroller.js';
import CutScene from 'scenes/cut_scene.js';
import Mission from 'mission.js';

// Maintains game state at all times.
// Main menu hands off control to this class which takes things from there.


function Tracker() {

    var me = this;

    this.game_play = null;

    // Handle JSON mission file.
    this.loadStory = function(storyName) {
        Debug.log('Downloading story json: ' + storyName + '.json');

        var httpRequest = new XMLHttpRequest();

        var promise = new Promise(function(resolve, reject){
            httpRequest.onreadystatechange = function() {
                if (httpRequest.readyState === 4 && httpRequest.status === 200) {
                    Debug.log('Story JSON returned, setting up game.');

                    me.game_play = JSON.parse(httpRequest.responseText);

                    // Used to determine whether the game is currently in a system.
                    // window.inSystem = false;

                    resolve();
                }
            }
        });
        httpRequest.open('GET', storyName + '.json', true);
        httpRequest.send(null);

        return promise;
    }

    // Advance to next top-level part of the game.
    this.next_scene = function() {
        var next = this.game_play.shift();

        Debug.log('Next stage: ' + next.type, Debug.type.info, 'Tracker');

        var scene = null;
        switch (next.type) {
            case 'scroller':
                scene = new Scroller(next);
                scene.main_loop().then(function(){
                    me.next_scene();
                });
                break;
            case 'cutscene':
                scene = new CutScene(next);
                scene.main_loop().then(function(){
                    me.next_scene();
                });
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
}

export default Tracker;
