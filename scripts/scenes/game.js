'use strict';

function Game() {

    var me = this;

    var state = window.game_state;

    // Create starfields
    for (var i=0;i<=70;i=i+1) {
        state.starfieldBack.push([Math.random()*800, Math.random()*600]);
    }
    for (var i=0;i<=70;i=i+1) {
        state.starfieldMiddle.push([Math.random()*800, Math.random()*600]);
    }
    for (var i=0;i<=70;i=i+1) {
        state.starfieldFront.push([Math.random()*800, Math.random()*600]);
    }

    var powerup = new PowerUp('rate', new Point(400,400), 10);
    state.drawObjects.push(powerup);

    function collision(obj1, obj2) {
        if (!(obj1.currPoint.X + obj1.width < obj2.currPoint.X ||
                obj2.currPoint.X + obj2.width < obj1.currPoint.X ||
                obj1.currPoint.Y + obj1.height < obj2.currPoint.Y ||
                obj2.currPoint.Y + obj2.height < obj1.currPoint.Y)) {
            // Rectangles intersect
            return true;
        }
        else {
            return false;
        }
    }

    this.draw = function () {
        // clear canvas
        state.ctx.clearRect(state.cameraX, state.cameraY, $('#game').width(), $('#game').height());

        // create background
        state.ctx.drawImage(gameImages["spirit"], state.cameraX, state.cameraY);

        // Draw starfield
        state.ctx.fillStyle = "gray";
        for (var i=state.starfieldBack.length-1; i>=0; --i) {
            var star = state.starfieldBack[i];
            if (star[0] < state.cameraX) {
                star[0] += 800;
            } else if (star[0] > state.cameraX + 800) {
                star[0] -= 800;
            }
            if (star[1] < state.cameraY) {
                star[1] += 600;
            } else if (star[1] > state.cameraY + 600) {
                star[1] -= 600;
            }
            state.ctx.fillRect(star[0], star[1], 1, 1);
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

        // Detect collisions
        state.drawObjects.forEach(function(obj) {
            if (obj.type == "good_shot") {
                state.drawObjects.forEach(function(obj2) {
                    if (obj2.type == "bad_ship" && collision(obj, obj2)) {
                        obj2.shield -= obj.damage;
                        obj.reapMe = true;
                    }
                });
            } else if (obj.type == "bad_shot") {
                state.drawObjects.forEach(function(obj2) {
                    if (obj2.type == "good_ship" && collision(obj, obj2)) {
                        obj2.shield -= obj.damage;
                        obj.reapMe = true;
                    }
                });
            } else if (obj.firefly) { // check for powerups.
                state.drawObjects.forEach(function(obj2) {
                    if (obj2.type == 'pickup' && collision(obj, obj2)) {
                        obj.handlePowerup(obj2);
                        obj2.reapMe = true;
                    }
                });
            }
        });
    }

    this.main_loop = function () {
        me.draw();
        setInterval(function() {
            me.draw();
        }, 40);
    }
}

// Handle XML mission file.
function loadStory(storyName) {
    // TODO: Get rid of jQuery. We can assume a sane environment.
    $.getJSON(storyName + '.json', function(data) {
        window.game_play = data;

        // Used to determine whether the game is currently in a system.
        window.inSystem = false;

        handle_next();
    });
}

// Advance to next top-level part of the game.
function handle_next() {
    var next = game_play.shift();
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
