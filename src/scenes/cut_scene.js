import FlyStraightAI from 'ai/fly_straight_ai.js';
import Point from 'point.js';
import NoWeapon from 'weapons/no_weapon.js';
import EnemyShip from 'objects/enemy_ship.js';
import talkBox from 'misc.js';
import kbd from 'keyboard.js'

function CutScene(element) {

    var me = this;

    var state = window.game_state;

    state.ctx.save();

    var currTime = 0;

    var completion_resolve = null;

    // draw starfield
    var starfield = [];
    for (var i=0;i<=70;i=i+1) {
        starfield.push([Math.random()*800, Math.random()*600]);
    }

    // Grab Text snippits
    var text = [];
    for (var i = 0; i < element.dialogue.length; i++) {
        var talk = [];
        talk.text = element.dialogue[i].text;
        talk.person = element.dialogue[i].person;
        text.push(talk);
    };


    // Set up scene
    for (var i = 0; i < element.scene.ships.length; i++) {
        var ai = new FlyStraightAI(element.scene.ships[i].speed, new Point(element.scene.ships[i].X, element.scene.ships[i].Y));
        var weapon = new NoWeapon();
        var ship = new EnemyShip(ai, element.scene.ships[i].type, 1, weapon);
        ship.noShield = true;
        state.drawObjects.push(ship);
    };

    var sceneSpeed = element.scene.speed;

    // main loop
    this.main_loop_interval = null;

    // Draw state tracking
    var currState = 'pause'; // Can be pause or talk
    var count = 0;
    var currText = 0;

    var dom_game = document.getElementById('game');

    this.draw = function () {
        // clear canvas
        state.ctx.clearRect(0, 0, dom_game.offsetWidth, dom_game.offsetHeight);

        state.camera.X += sceneSpeed;
        state.ctx.translate(-sceneSpeed, 0);

        // create background
        state.ctx.drawImage(gameImages["spirit"], state.camera.X, state.camera.Y);

        // Draw starfield
        state.ctx.fillStyle = "gray";
        for (var i=starfield.length-1; i>=0; --i) {
            var star = starfield[i];
            if (star[0] < state.camera.X) {
                star[0] += 800;
            } else if (star[0] > state.camera.X + 800) {
                star[0] -= 800;
            }
            if (star[1] < state.camera.Y) {
                star[1] += 600;
            } else if (star[1] > state.camera.Y + 600) {
                star[1] -= 600;
            }
            state.ctx.fillRect(star[0], star[1], 1, 1);
        }

        // Show messages
        if (currState == 'pause') {
            if (count < 50) {
                count += 1;
            } else {
                count = 0;
                currState = 'talk';
            }
        } else {
            if (count < 250) {
                if (text.length == currText) {
                    // Done
                    endCutScene();
                } else {
                    talkBox(text[currText].person, text[currText].text, new Point(100 + state.camera.X, 450), state.ctx);
                    count += 1;
                }
            } else {
                currState = 'pause';
                count = 0;
                currText += 1;
            }
        }

        function endCutScene() {
            clearInterval(me.main_loop_interval);

            completion_resolve();
        }

        if (kbd.ctrl == true) { // Skip scene
            kbd.ctrl = false; // Force the user to press the key again.
            endCutScene();
        }

        // Reap objects
        state.drawObjects.forEach(function(obj, i, arr) {
            if (obj.reapMe == true) {
                arr.splice(i, 1);
            }
        });

        // Draw all other objects
        state.drawObjects.forEach(function(obj) {
            obj.draw();
        });

        // Advance clock
        currTime += 1;
    }

    this.main_loop = function () {
        return new Promise(function(resolve, reject){
            completion_resolve = resolve
            me.main_loop_interval = setInterval(function() {
                me.draw(resolve);
            }, 40);
        });
    }
}

export default CutScene;
