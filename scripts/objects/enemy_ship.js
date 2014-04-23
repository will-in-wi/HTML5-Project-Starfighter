'use strict';

// Objects must have the draw function, the reapMe property, and the type property.
// The type property has five states: good_shot, bad_shot, good_ship, bad_ship, no_explode, pickup.

// Enemy Ship
function EnemyShip(ai, ship, shield, primaryWeapon) {

    var state = window.game_state;

    var loc = ai.whereTo(new Point(ai.X, ai.Y));
    this.AI = ai
    this.currPoint = loc;
    this.ship = ship;
    this.destroyStep = 5;
    this.destroyStepFirst = true;
    this.direction = 'right';

    // Used for cutscenes, menus, etc...
    // TODO: Replace with shield = null.
    this.noShield = false;

    this.shield = shield;
    this.maxShield = shield;

    this.primaryWeapon = primaryWeapon;
    this.secondaryWeapon = new NoWeapon();

    // Shot limiter
    this.shotState = 10;

    // collision box
    this.width = gameImages[ship + "1"].width;
    this.height = gameImages[ship + "1"].height;

    this.reapMe = false;
    this.type = "bad_ship";

    this.draw = function () {
        if (this.shield <= 0) {
            this.reapMe = true;
            var explode = new Explosion(this.currPoint);
            state.drawObjects.push(explode);
        } else {
            // Get new location from AI.
            var newPoint = this.AI.whereTo();

            // determine left vs. right from change in X.
            if (newPoint.X > this.currPoint.X) {
                this.direction = 'right';
            } else if (newPoint.X < this.currPoint.X) {
                this.direction = 'left';
            }

            this.currPoint = newPoint;

            // Add arrow if object is off screen.
            if (this.currPoint.X < state.cameraX || this.currPoint.X > state.cameraX + 800 || this.currPoint.Y < state.cameraY || this.currPoint.Y > state.cameraY + 600) {
                // Show arrow on edge of screen
                if (this.currPoint.X < state.cameraX && this.currPoint.Y < state.cameraY) { // upper left corner
                    state.ctx.drawImage(gameImages["arrowNorthWest"], state.cameraX + 2, state.cameraY + 2);
                } else if (this.currPoint.X < state.cameraX && this.currPoint.Y > state.cameraY + 600) { // lower left corner
                    state.ctx.drawImage(gameImages["arrowSouthWest"], state.cameraX + 2, state.cameraY + 585);
                } else if (this.currPoint.X > state.cameraX + 800 && this.currPoint.Y < state.cameraY) { // upper right corner
                    state.ctx.drawImage(gameImages["arrowNorthEast"], state.cameraX + 785, state.cameraY + 2);
                } else if (this.currPoint.X > state.cameraX + 800 && this.currPoint.Y > state.cameraY + 600) { // lower right corner
                    state.ctx.drawImage(gameImages["arrowSouthEast"], state.cameraX + 785, state.cameraY + 585);
                } else if (this.currPoint.X < state.cameraX) { // Left side
                    state.ctx.drawImage(gameImages["arrowWest"], state.cameraX + 2, this.currPoint.Y);
                } else if (this.currPoint.X > state.cameraX + 800) { // Right Side
                    state.ctx.drawImage(gameImages["arrowEast"], state.cameraX + 785, this.currPoint.Y);
                } else if (this.currPoint.Y < state.cameraY) { // Top side
                    state.ctx.drawImage(gameImages["arrowNorth"], this.currPoint.X, state.cameraY + 2);
                } else if (this.currPoint.Y > state.cameraY + 600) { // Bottom side
                    state.ctx.drawImage(gameImages["arrowSouth"], this.currPoint.X, state.cameraY + 585);
                }
            } else {
                // Draw ship
                if (this.direction == 'right') {
                    state.ctx.drawImage(gameImages[this.ship + "1"], this.currPoint.X, this.currPoint.Y);
                } else if (this.direction == 'left')  {
                    state.ctx.drawImage(gameImages[this.ship + "2"], this.currPoint.X, this.currPoint.Y);
                }

                // Draw shield above ship
                if (!this.noShield) {
                    var percentageShield = this.shield / this.maxShield * 100;
                    if (percentageShield > 66) {
                        state.ctx.fillStyle = 'green';
                    } else if (percentageShield > 33) {
                        state.ctx.fillStyle = 'orange';
                    } else {
                        state.ctx.fillStyle = 'red';
                    }
                    var fillWidth = (gameImages[this.ship + "1"].width) * (percentageShield / 100);
                    state.ctx.fillRect(this.currPoint.X + 1, this.currPoint.Y - 10, fillWidth, 5);
                }

                // draw smoke
                var smokePoint = new Point(0, Math.random()*gameImages[this.ship + "1"].height + this.currPoint.Y);
                if (this.direction == 'right') {
                    smokePoint.X = this.currPoint.X - 2;
                } else if (this.direction == 'left') {
                    smokePoint.X = this.currPoint.X + 25;
                }
                var smoke = new Smoke(smokePoint);
                state.drawObjects.push(smoke);
            }

            // Fire if Firefly is in front.
            if (state.firefly) { // Firefly does not exist in menu
                if (this.currPoint.Y + 10 > state.firefly.currPoint.Y && this.currPoint.Y - 10 < state.firefly.currPoint.Y) { // Firefly is in line of fire.
                    // Shoot
                    if (this.direction == 'right') { // Shoot right
                        if (this.currPoint.X < state.firefly.currPoint.X) {
                            this.primaryWeapon.fire(this.direction, this.currPoint);
                        } else {
                            this.primaryWeapon.nofire();
                        }
                    } else { // Shoot left
                        if (this.currPoint.X > state.firefly.currPoint.X) {
                            this.primaryWeapon.fire(this.direction, this.currPoint);
                        } else {
                            this.primaryWeapon.nofire();
                        }
                    }
                } else {
                    this.primaryWeapon.nofire();
                }
            }
        }
    }
}