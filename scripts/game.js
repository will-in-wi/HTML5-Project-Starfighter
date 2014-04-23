'use strict';

function start_mission(element) {
    /*
        I need to obtain settings from the element, turn them into some kind of object, and pass that
        to the actual game.

        Pass object to briefing, briefing passes to game, game passes to debriefing, debriefing is done.

        Info game needs:
            ships
            objectives
            dialogue
            Additional info text


    */


}

function game() {

    var state = window.game_state;
    state.reset();
    state.ctx.restore();

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

    // Add the firefly
    state.firefly = new Firefly(new Point(100, 100));
    state.drawObjects.push(state.firefly);

    // TEMP - Remove later
    /*for (var i=1;i<=5;i=i+1) {
        var ai = new AI(100, new Point(Math.random()*800, Math.random()*600));
        var weapon = new NormalBadShot();
        var badguy = new EnemyShip(ai, "dualFighter", 50, weapon);
        drawObjects.push(badguy);
    }
    for (var i=1;i<=3;i=i+1) {
        var ai = new AI(100, new Point(Math.random()*800, Math.random()*600));
        var weapon = new NoWeapon();
        var badguy = new EnemyShip(ai, "transport", 100, weapon);
        drawObjects.push(badguy);
    }*/
    var powerup = new PowerUp('rate', new Point(400,400), 10);
    state.drawObjects.push(powerup);

    // main loop
    setInterval(function() {
        draw();
    }, 40);

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

    function draw() {
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

    // Initial draw
    draw();
}

function drawScroller(element) {

    var state = window.game_state;
    state.reset();

    state.ctx.save();

    var currY = 620;
    var wait = 100;

    // main loop
    var mainLoop = setInterval(function() {
        draw();
    }, 40);

    function draw() {
        // clear canvas
        state.ctx.clearRect(state.cameraX, state.cameraY, $('#game').width(), $('#game').height());

        // create background
        state.ctx.drawImage(gameImages[element.background], state.cameraX, state.cameraY);

        // Draw text
        state.ctx.font = "bolder 12pt 'Bitstream Vera Sans Mono'";
        state.ctx.textAlign = 'center';

        var i = 0;
        while (i < element.text.length) {
            // Draw shadow
            state.ctx.fillStyle = 'black';
            state.ctx.fillText(element.text[i], 401, currY + 1 + (i * 24));

            // Draw text
            state.ctx.fillStyle = 'white';
            state.ctx.fillText(element.text[i], 400, currY + (i * 24));

            i += 1;
        }

        if (currY > element.stop) {
            currY -= 1;
        } else {
            if (wait > 0) {
                wait -= 1;
            } else {
                exit_scroller();
            }
        }

        // Cancel when the user pushes ctrl
        if (kbd.ctrl == true) {
            kbd.ctrl = false; // Force the user to press the key again.
            exit_scroller();
        }

        function exit_scroller() {
            clearInterval(mainLoop);

            // Decide what function gets execution.
            if (inSystem == false) {
                handle_next();
            } else {
                // TODO: go to next scene in system
            }
        }
    }
}

function drawCutScene(element) {

    var state = window.game_state;

    state.ctx.save();

    var currTime = 0;

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

    var sceneSpeed = Number(element.scene.speed);

    // main loop
    var mainLoop = setInterval(function() {
        draw();
    }, 40);

    // Draw state tracking
    var currState = 'pause'; // Can be pause or talk
    var count = 0;
    var currText = 0;

    function draw() {
        // clear canvas
        state.ctx.clearRect(0, 0, $('#game').width(), $('#game').height());

        state.cameraX += sceneSpeed;
        state.ctx.translate(-sceneSpeed, 0);

        // create background
        state.ctx.drawImage(gameImages["spirit"], state.cameraX, state.cameraY);

        // Draw starfield
        state.ctx.fillStyle = "gray";
        for (var i=starfield.length-1; i>=0; --i) {
            var star = starfield[i];
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
                    talkBox(text[currText].person, text[currText].text, new Point(100 + state.cameraX, 450), state.ctx);
                    count += 1;
                }
            } else {
                currState = 'pause';
                count = 0;
                currText += 1;
            }
        }

        function endCutScene() {
            clearInterval(mainLoop);

            // Decide what function gets execution.
            if (inSystem == false) {
                handle_next();
            } else {
                // TODO: go to next scene in system
            }
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
    switch (next.type) {
        case 'scroller':
            drawScroller(next);
            break;
        case 'cutscene':
            drawCutScene(next);
            break;
        case 'mission':
            start_mission(next);
            break;
        default:
            console.log(game_play);
    }
}
