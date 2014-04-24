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

    var dom_game = document.getElementById('game');

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
        state.ctx.clearRect(state.camera.X, state.camera.Y, dom_game.offsetWidth, dom_game.offsetHeight);

        // create background
        state.ctx.drawImage(gameImages["spirit"], state.camera.X, state.camera.Y);

        // Draw starfield
        state.ctx.fillStyle = "gray";
        for (var i=state.starfieldBack.length-1; i>=0; --i) {
            var star = state.starfieldBack[i];
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
            } else if (obj.handlePowerup) { // check for powerups.
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
