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

function start_game() {
    var canvas = document.getElementById('game');
    var ctx = canvas.getContext('2d');
    ctx.restore();

    window.cameraX = 0;
    window.cameraY = 0;

    // Create starfields
    window.starfieldBack = [];
    for (var i=0;i<=70;i=i+1) {
        starfieldBack.push([Math.random()*800, Math.random()*600]);
    }
    window.starfieldMiddle = [];
    for (var i=0;i<=70;i=i+1) {
        starfieldBack.push([Math.random()*800, Math.random()*600]);
    }
    window.starfieldFront = [];
    for (var i=0;i<=70;i=i+1) {
        starfieldBack.push([Math.random()*800, Math.random()*600]);
    }

    // Initialize variables
    window.drawObjects = [];

    // Add the firefly
    window.firefly = new Firefly(new Point(100, 100));
    drawObjects.push(firefly);

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
    drawObjects.push(powerup);

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
        ctx.clearRect(cameraX, cameraY, $('#game').width(), $('#game').height());

        // create background
        ctx.drawImage(gameImages["spirit"], cameraX, cameraY);

        // Draw starfield
        ctx.fillStyle = "gray";
        for (var i=starfieldBack.length-1; i>=0; --i) {
            var star = starfieldBack[i];
            if (star[0] < cameraX) {
                star[0] += 800;
            } else if (star[0] > cameraX + 800) {
                star[0] -= 800;
            }
            if (star[1] < cameraY) {
                star[1] += 600;
            } else if (star[1] > cameraY + 600) {
                star[1] -= 600;
            }
            ctx.fillRect(star[0], star[1], 1, 1);
        }

        // Reap objects
        drawObjects.forEach(function(obj, i, arr) {
            if (obj.reapMe == true) {
                arr.splice(i, 1);
            }
        });

        // Draw all other objects
        drawObjects.forEach(function(obj) {
            obj.draw(ctx);
        });

        // Detect collisions
        drawObjects.forEach(function(obj) {
            if (obj.type == "good_shot") {
                drawObjects.forEach(function(obj2) {
                    if (obj2.type == "bad_ship" && collision(obj, obj2)) {
                        obj2.shield -= obj.damage;
                        obj.reapMe = true;
                    }
                });
            } else if (obj.type == "bad_shot") {
                drawObjects.forEach(function(obj2) {
                    if (obj2.type == "good_ship" && collision(obj, obj2)) {
                        obj2.shield -= obj.damage;
                        obj.reapMe = true;
                    }
                });
            } else if (obj.firefly) { // check for powerups.
                drawObjects.forEach(function(obj2) {
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

    // Get scrolling text
    var scrollingText = [];
    $(element).children('text').children().each(function(index, interElement) {
        scrollingText.push($(interElement).html());
    });

    var canvas = document.getElementById('game');
    var ctx = canvas.getContext('2d');

    ctx.save();

    var currY = 620;
    var wait = 100;

    // Get settings
    var background = $(element).attr('background');
    var stop = $(element).attr('stop');

    // main loop
    var mainLoop = setInterval(function() {
        draw();
    }, 40);

    function draw() {
        // clear canvas
        ctx.clearRect(cameraX, cameraY, $('#game').width(), $('#game').height());

        // create background
        ctx.drawImage(gameImages[background], cameraX, cameraY);

        // Draw text
        ctx.font = "bolder 12pt 'Bitstream Vera Sans Mono'";
        ctx.textAlign = 'center';

        var i = 0;
        while (i < scrollingText.length) {
            // Draw shadow
            ctx.fillStyle = 'black';
            ctx.fillText(scrollingText[i], 401, currY + 1 + (i * 24));

            // Draw text
            ctx.fillStyle = 'white';
            ctx.fillText(scrollingText[i], 400, currY + (i * 24));

            i += 1;
        }

        if (currY > stop) {
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
    var canvas = document.getElementById('game');
    var ctx = canvas.getContext('2d');

    ctx.save();

    var currTime = 0;

    // Initialize variables
    window.drawObjects = [];

    // draw starfield
    var starfield = [];
    for (var i=0;i<=70;i=i+1) {
        starfield.push([Math.random()*800, Math.random()*600]);
    }

    // Grab Text snippits
    var text = [];
    $(element).children('dialogue').children().each(function(index, interElement) {
        var talk = [];
        talk.text = $(interElement).html();
        talk.person = $(interElement).attr('person');
        text.push(talk);
    });


    // Set up scene
    $(element).children('scene').children().each(function(index, interElement) {
        var ai = new FlyStraightAI(Number($(interElement).attr('speed')), new Point(Number($(interElement).attr('X')), Number($(interElement).attr('Y'))));
        var weapon = new NoWeapon();
        var ship = new EnemyShip(ai, $(interElement).attr('type'), 1, weapon);
        ship.noShield = true;
        drawObjects.push(ship);
    });

    var sceneSpeed = Number($(element).children('scene').attr('speed'));

    // Camera tracking
    window.cameraX = 0;
    window.cameraY = 0;

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
        ctx.clearRect(0, 0, $('#game').width(), $('#game').height());

        cameraX += sceneSpeed;
        ctx.translate(-sceneSpeed, 0);

        // create background
        ctx.drawImage(gameImages["spirit"], cameraX, cameraY);

        // Draw starfield
        ctx.fillStyle = "gray";
        for (var i=starfield.length-1; i>=0; --i) {
            var star = starfield[i];
            if (star[0] < cameraX) {
                star[0] += 800;
            } else if (star[0] > cameraX + 800) {
                star[0] -= 800;
            }
            if (star[1] < cameraY) {
                star[1] += 600;
            } else if (star[1] > cameraY + 600) {
                star[1] -= 600;
            }
            ctx.fillRect(star[0], star[1], 1, 1);
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
                    talkBox(text[currText].person, text[currText].text, new Point(100 + cameraX, 450), ctx);
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
        drawObjects.forEach(function(obj, i, arr) {
            if (obj.reapMe == true) {
                arr.splice(i, 1);
            }
        });

        // Draw all other objects
        drawObjects.forEach(function(obj) {
            obj.draw(ctx);
        });

        // Advance clock
        currTime += 1;
    }
}

// Handle XML mission file.
function load_xml() {
    $.get('game.xml', function(data) {
        window.game_play = [];
        $(data).children().each(function(index, element) {
            game_play.push(element);
        });

        // Used to determine whether the game is currently in a system.
        window.inSystem = false;

        handle_next();
    });
}

// Advance to next top-level part of the game.
function handle_next() {
    var next = game_play.shift();
    switch (next.localName) {
        case 'scroller':
            drawScroller(next);
            break;
        case 'cutscene':
            drawCutScene(next);
            break;
        case 'mission':
            start_mission(next);
    }
}
