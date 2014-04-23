// Shot object
function Shot(startPoint, gfx, side, direction, damage) {

    var state = window.game_state;

    this.currPoint = $.extend(true, {}, startPoint);
    this.distance = 1000;
    this.gfx = gfx;
    this.startPoint = startPoint;
    this.speed = 25;
    this.direction = direction;

    this.damage = damage;

    // collision box
    this.width = gfx.width;
    this.height = gfx.height;

    this.reapMe = false;
    this.type = side + "_shot";

    // Shot was just created, make fire sound.
    //playSound("data/sound/plasma");

    this.draw = function () {
        if (this.direction == 'right') {
            this.currPoint.X = this.currPoint.X + this.speed;
        } else if (this.direction == 'left') {
            this.currPoint.X = this.currPoint.X - this.speed;
        }
        if (this.currPoint.X - this.startPoint.X >= this.distance || this.startPoint.X - this.currPoint.X >= this.distance) {
            this.reapMe = true;
        } else {
            state.ctx.drawImage(this.gfx, this.currPoint.X, this.currPoint.Y);
        }
    }
}


// Normal shot for good guys.
function NormalGoodShot() {

    var state = window.game_state;

    // Number of shots in blast
    this.numShots = 1;

    // Powerups
    this.possibleSpeed = 5;
    this.speed = 1; // real speed = 9 - speed.
    this.possibleShots = 5;
    this.shots = 1; // Number of shots at a time.
    this.possibleDamage = 5;
    this.damage = 1; // real damage = damage * 10;

    // Tracks number of frames since last shot.
    this.shotState = this.speed;

    // Plasma numbers
    this.maxPlasmaShots = 100;
    this.plasmaShots = 0;

    // Spread or not
    this.spread = false;

    this.fire = function(direction, currPoint) {
        if (this.shotState < 8 - this.speed) {
            this.shotState += 1;
        } else {
            // Check number of plasmas
            if (this.plasmaShots > 0) {
                this.plasmaShots -= 1;
            } else {
                this.speed = 1;
                this.shots = 1;
                this.damage = 1;
            }

            var shotLoc = $.extend(true, {}, currPoint);
            shotLoc.Y += 3;
            for (var i = 0; i <= this.shots - 1; i = i + 1) {
                var newPoint = new Point(shotLoc.X, shotLoc.Y + (i*3));
                var shot = new Shot(newPoint, gameImages["plasmaGreen"], "good", direction, this.damage * 10);
                state.drawObjects.push(shot);
            }
            // Shot was just created, make fire sound.
            playSound("data/sound/plasma");
            this.shotState = 1;
        }
    }

    // Executed once per frame. Handles repeat speed.
    this.nofire = function() {
        if (this.shotState < 8 - this.speed) {
            this.shotState += 1;
        } else {
            this.shotState = 8 - this.speed;
        }
    }
}


// Rocket object
function Rocket(startPoint, side, direction) {

    var state = window.game_state;

    this.currPoint = $.extend(true, {}, startPoint);
    this.distance = 1000;
    this.startPoint = startPoint;
    this.speed = 35;
    this.direction = direction;

    this.damage = 100;

    // collision box
    this.width = 20;
    this.height = 7;

    this.reapMe = false;
    this.type = side + "_shot";

    this.draw = function (ctx) {
        if (this.currPoint.X - this.startPoint.X >= this.distance || this.startPoint.X - this.currPoint.X >= this.distance) {
            this.reapMe = true;
        } else {
            // Draw smoke
            var smoke = new Smoke(new Point(this.currPoint.X, this.currPoint.Y + 2));
            state.drawObjects.push(smoke);

            // Draw missle
            if (this.direction == 'right') {
                this.currPoint.X = this.currPoint.X + this.speed;
                ctx.drawImage(gameImages['rocket1'], this.currPoint.X, this.currPoint.Y);
            } else if (this.direction == 'left') {
                this.currPoint.X = this.currPoint.X - this.speed;
                ctx.drawImage(gameImages['rocket2'], this.currPoint.X, this.currPoint.Y);
            }
        }
    }
}


// Missles
function Missle() {

    var state = window.game_state;

    // Tracks number of frames since last shot.
    this.speed = 10;
    this.shotState = this.speed;

    // Missle numbers
    this.maxMissles = 10;
    this.missles = 3;

    this.fire = function(direction, currPoint) {
        if (this.shotState < this.speed) {
            this.shotState += 1;
        } else {
            // Check number of shots
            if (this.missles > 0) {
                this.missles -= 1;
                var shotLoc = $.extend(true, {}, currPoint);
                shotLoc.Y += 3;
                var missle = new Rocket(shotLoc, "good", direction);
                playSound('data/sound/missile');
                state.drawObjects.push(missle);

                this.shotState = 1;
            }
        }
    }

    // Executed once per frame. Handles repeat speed.
    this.nofire = function() {
        if (this.shotState < this.speed) {
            this.shotState += 1;
        } else {
            this.shotState = this.speed;
        }
    }

    this.drawStatus = function() {
        state.ctx.fillStyle = 'white';
        state.ctx.fillText('Rockets: ' + this.missles, state.cameraX + 400, state.cameraY + 560);
    }
}


// Laser secondary weapon
function Laser() {

    var state = window.game_state;

    // Allows the laser to overheat
    this.heat = 0;
    this.maxHeat = 1000;

    this.fire = function(direction, currPoint) {
        if (this.heat > this.maxHeat) {
            this.heat -= 5;
        } else if (this.heat == this.maxHeat) {
            this.heat = 1400;
        } else {
            var shot = new Shot(new Point(currPoint.X, currPoint.Y + 4), gameImages['plasmaRed'], 'good', direction, 1);
            state.drawObjects.push(shot);

            // Shot was just created, make fire sound.
            playSound("data/sound/plasma");

            this.heat += 10;
        }
    }

    this.nofire = function() {
        if (this.heat > 0) {
            this.heat -= 5;
        }
    }

    this.drawStatus = function() {
        state.ctx.fillStyle = 'white';
        state.ctx.fillText('Heat', cameraX + 400, cameraY + 560);

        if (this.heat > 1000) {
            state.ctx.fillStyle = 'red';
        } else {
            state.ctx.fillStyle = 'green';
        }
        state.ctx.fillRect(cameraX + 445, cameraY + 548, this.heat / 10, 15);
    }
}


// Charge up cannon
function ChargeCannon() {

    var state = window.game_state;

    // Amount that has been charged.
    this.charged = 0;
    this.maxCharge = 100;

    // remember last fire values.
    this.direction = 'left';
    this.currPoint;

    this.fire = function(direction, currPoint) {
        if (this.charged < this.maxCharge) {
            this.charged += 1;
        }

        // Store for usage by the nofire function.
        this.direction = direction;
        this.currPoint = currPoint;
    }

    this.nofire = function() {
        if (this.charged > 0) {
            // Fire
            // Several columns with several randomly distributed rows each.
            for (var i = 1; i <= this.charged; i = i + 1) { // max 15 columns
                var currCol = Math.floor(i / 7);
                var shot = new Shot(new Point(this.currPoint.X - (currCol * 6), this.currPoint.Y + Math.floor(Math.random()*10)), gameImages['greenDir'], 'good', this.direction, 1);
                state.drawObjects.push(shot);
            }
            playSound('data/sound/plasma3');
            this.charged = 0;
        }
    }

    this.drawStatus = function() {
        state.ctx.fillStyle = 'white';
        state.ctx.fillText('Charge', state.cameraX + 400, state.cameraY + 560);

        if (this.charged > 66) {
            state.ctx.fillStyle = 'red';
        } else {
            state.ctx.fillStyle = 'green';
        }
        state.ctx.fillRect(state.cameraX + 455, state.cameraY + 548, this.charged, 15);
    }
}


// No weapon; does nothing
function NoWeapon() {
    // Does nothing. Used for ships such as freighters.

    this.fire = function(direction, currPoint) {
        // Again, does nothing.
    }

    this.nofire = function() {
        // Again, does nothing.
    }
}


// Normal shot for bad guys.
function NormalBadShot() {

    var state = window.game_state;

    // Number of shots in blast
    this.numShots = 1;

    // Powerups
    this.speed = 1; // real speed = 9 - speed.
    this.shots = 1; // Number of shots at a time.
    this.damage = 5; // damage done

    // Tracks number of frames since last shot.
    this.shotState = this.speed;

    // Spread or not
    this.spread = false;

    this.fire = function(direction, currPoint) {
        if (this.shotState < 8 - this.speed) {
            this.shotState += 1;
        } else {
            var shotLoc = $.extend(true, {}, currPoint);
            shotLoc.Y += 3;
            for (var i = 0; i <= this.shots - 1; i = i + 1) {
                var newPoint = new Point(shotLoc.X, shotLoc.Y + (i*3));
                var shot = new Shot(newPoint, gameImages["plasmaRed"], "bad", direction, this.damage);
                state.drawObjects.push(shot);
            }
            // Shot was just created, make fire sound.
            playSound("data/sound/plasma");
            this.shotState = 1;
        }
    }

    // Executed once per frame. Handles repeat speed.
    this.nofire = function() {
        if (this.shotState < 8 - this.speed) {
            this.shotState += 1;
        } else {
            this.shotState = 8 - this.speed;
        }
    }
}
