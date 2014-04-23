// Objects must have the draw function, the reapMe property, and the type property.
// The type property has five states: good_shot, bad_shot, good_ship, bad_ship, no_explode, pickup.

// Enemy Ship
function EnemyShip(ai, ship, shield, primaryWeapon) {
    var loc = ai.whereTo(new Point(ai.X, ai.Y));
    this.AI = ai
    this.currPoint = loc;
    this.ship = ship;
    this.destroyStep = 5;
    this.destroyStepFirst = true;
    this.direction = 'right';

    // Used for cutscenes, menus, etc...
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
}

EnemyShip.prototype.draw = function (ctx) {
    if (this.shield <= 0) {
        this.reapMe = true;
        var explode = new Explosion(this.currPoint);
        drawObjects.push(explode);
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
        if (this.currPoint.X < cameraX || this.currPoint.X > cameraX + 800 || this.currPoint.Y < cameraY || this.currPoint.Y > cameraY + 600) {
            // Show arrow on edge of screen
            if (this.currPoint.X < cameraX && this.currPoint.Y < cameraY) { // upper left corner
                ctx.drawImage(gameImages["arrowNorthWest"], cameraX + 2, cameraY + 2);
            } else if (this.currPoint.X < cameraX && this.currPoint.Y > cameraY + 600) { // lower left corner
                ctx.drawImage(gameImages["arrowSouthWest"], cameraX + 2, cameraY + 585);
            } else if (this.currPoint.X > cameraX + 800 && this.currPoint.Y < cameraY) { // upper right corner
                ctx.drawImage(gameImages["arrowNorthEast"], cameraX + 785, cameraY + 2);
            } else if (this.currPoint.X > cameraX + 800 && this.currPoint.Y > cameraY + 600) { // lower right corner
                ctx.drawImage(gameImages["arrowSouthEast"], cameraX + 785, cameraY + 585);
            } else if (this.currPoint.X < cameraX) { // Left side
                ctx.drawImage(gameImages["arrowWest"], cameraX + 2, this.currPoint.Y);
            } else if (this.currPoint.X > cameraX + 800) { // Right Side
                ctx.drawImage(gameImages["arrowEast"], cameraX + 785, this.currPoint.Y);
            } else if (this.currPoint.Y < cameraY) { // Top side
                ctx.drawImage(gameImages["arrowNorth"], this.currPoint.X, cameraY + 2);
            } else if (this.currPoint.Y > cameraY + 600) { // Bottom side
                ctx.drawImage(gameImages["arrowSouth"], this.currPoint.X, cameraY + 585);
            }
        } else {
            // Draw ship
            if (this.direction == 'right') {
                ctx.drawImage(gameImages[this.ship + "1"], this.currPoint.X, this.currPoint.Y);
            } else if (this.direction == 'left')  {
                ctx.drawImage(gameImages[this.ship + "2"], this.currPoint.X, this.currPoint.Y);
            }

            // Draw shield above ship
            if (!this.noShield) {
                var percentageShield = this.shield / this.maxShield * 100;
                if (percentageShield > 66) {
                    ctx.fillStyle = 'green';
                } else if (percentageShield > 33) {
                    ctx.fillStyle = 'orange';
                } else {
                    ctx.fillStyle = 'red';
                }
                var fillWidth = (gameImages[this.ship + "1"].width) * (percentageShield / 100);
                ctx.fillRect(this.currPoint.X + 1, this.currPoint.Y - 10, fillWidth, 5);
            }

            // draw smoke
            var smokePoint = new Point(0, Math.random()*gameImages[this.ship + "1"].height + this.currPoint.Y);
            if (this.direction == 'right') {
                smokePoint.X = this.currPoint.X - 2;
            } else if (this.direction == 'left') {
                smokePoint.X = this.currPoint.X + 25;
            }
            var smoke = new Smoke(smokePoint);
            drawObjects.push(smoke);
        }

        // Fire if Firefly is in front.
        if (window.firefly) { // Firefly does not exist in menu
            if (this.currPoint.Y + 10 > firefly.currPoint.Y && this.currPoint.Y - 10 < firefly.currPoint.Y) { // Firefly is in line of fire.
                // Shoot
                if (this.direction == 'right') { // Shoot right
                    if (this.currPoint.X < firefly.currPoint.X) {
                        this.primaryWeapon.fire(this.direction, this.currPoint);
                    } else {
                        this.primaryWeapon.nofire();
                    }
                } else { // Shoot left
                    if (this.currPoint.X > firefly.currPoint.X) {
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

// Explosion
function Explosion(startPoint) {
    this.currPoint = startPoint;

    this.step = 1;

    this.reapMe = false;
    this.type = "no_explode";
}

Explosion.prototype.draw = function (ctx) {
    var img = new Image();

    switch (this.step) {
        case 1:
            playSound("data/sound/explode");
            ctx.drawImage(gameImages["explode05"], this.currPoint.X, this.currPoint.Y);
            break;
        case 2:
            ctx.drawImage(gameImages["explode05"], this.currPoint.X, this.currPoint.Y);
            break;
        case 3:
        case 4:
            ctx.drawImage(gameImages["explode06"], this.currPoint.X, this.currPoint.Y);
            break;
        case 5:
        case 6:
            ctx.drawImage(gameImages["explode07"], this.currPoint.X, this.currPoint.Y);
            break;
        case 7:
        case 8:
            ctx.drawImage(gameImages["explode08"], this.currPoint.X, this.currPoint.Y);
            break;
        default:
            this.reapMe = true;
    }

    this.step = this.step + 1;
}

// Smoke
function Smoke(startPoint) {
    this.currPoint = startPoint;

    this.step = 1;

    this.reapMe = false;
    this.type = "no_explode";
}

Smoke.prototype.draw = function (ctx) {
    var img = new Image();
    switch (this.step) {
        case 1:
        case 2:
            ctx.fillStyle = 'white';
            ctx.fillRect(this.currPoint.X, this.currPoint.Y, 3, 3);
            break;
        case 3:
        case 4:
            ctx.fillStyle = 'yellow';
            ctx.fillRect(this.currPoint.X, this.currPoint.Y, 3, 3);
            break;
        case 5:
        case 6:
            ctx.fillStyle = 'orange';
            ctx.fillRect(this.currPoint.X, this.currPoint.Y, 3, 3);
            break;
        case 7:
        case 8:
            ctx.fillStyle = 'red';
            ctx.fillRect(this.currPoint.X, this.currPoint.Y, 3, 3);
            break;
        default:
            this.reapMe = true;
    }
    this.step = this.step + 1;
}

// An objective has a title and description, but must also implement the
// completed function which checks to see whether the objective has
// been completed.
function Objective(title, description) {
    this.title = title;
    this.description = description;
}

Objective.prototype.completed = function(objects) {
    // this should be implemented by a subclassing object.
    return true;
}

// objectives is an array of objective objects.
function Mission(objectives, title, description) {
    this.objectives = objectives;
    this.completedObjectives = [];
    this.title = title;
    this.description = description;
}

Mission.prototype.completed = function() {
    for (var objective in this.objectives) {

    }
}

// AI object
function AI(attack, startPoint) {
    this.goalPoint = startPoint;
    this.currPoint = startPoint;

    // if 0, then doing something. Otherwise, counts down every frame.
    this.wait = 0;

    this.attack = attack;
}

AI.prototype.whereTo = function() {
    // Travels at constant rate
    var SPEED = 9;

    // called each frame. Goes to the specified point. Once there, calculates a new one.
    var retPoint = new Point(this.currPoint.X, this.currPoint.Y);

    if (this.wait != 0) {
        // Continue waiting.
        this.wait -= 1;
    } else if (this.currPoint.X == this.goalPoint.X && this.currPoint.Y == this.goalPoint.Y) {
        // Decide whether to wait or go somewhere.
        if (Math.floor(Math.random()*2) == 0) {
            // Wait
            this.wait = Math.floor(Math.random()*100);
        } else {
            // Decide where to go.
            // The ship will not go further than 800 pixels from the firefly.
            this.goalPoint.X = Math.floor(Math.random()*800) + firefly.currPoint.X - 400;
            this.goalPoint.Y = Math.floor(Math.random()*800) + firefly.currPoint.Y - 400;
        }
    } else {
        // Continue traveling to the predetermined point.
        // Travels at a constant rate of 8 px/frame.
        if (Math.abs(this.goalPoint.X - this.currPoint.X) < SPEED) {
            // If within 15 pixels of goal, just go there.
            retPoint.X = this.goalPoint.X;
        } else {
            // Go 15 pixels toward goal.
            if (this.goalPoint.X - this.currPoint.X > 0) {
                retPoint.X = this.currPoint.X + SPEED;
            } else {
                retPoint.X = this.currPoint.X - SPEED;
            }
        }

        if (Math.abs(this.goalPoint.Y - this.currPoint.Y) < SPEED) {
            retPoint.Y = this.goalPoint.Y;
        } else {
            if (this.goalPoint.Y - this.currPoint.Y > 0) {
                retPoint.Y = this.currPoint.Y + SPEED;
            } else {
                retPoint.Y = this.currPoint.Y - SPEED;
            }
        }
    }

    this.currPoint = retPoint;
    return retPoint;
}


// To be used for CutScenes
function FlyStraightAI(speed, startPoint) {
    this.currPoint = $.extend(true, {}, startPoint);
    this.speed = speed;
}

FlyStraightAI.prototype.whereTo = function() {
    this.currPoint.X += this.speed;

    return this.currPoint;
}


// Point object
function Point(x, y) {
    this.X = x;
    this.Y = y;
}