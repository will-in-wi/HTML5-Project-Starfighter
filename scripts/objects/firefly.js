'use strict';

// The firefly fighter
function Firefly(startPoint) {

    var state = window.game_state;

    this.currPoint = startPoint;
    this.width = gameImages['firefly1'].width;
    this.height = gameImages['firefly1'].height;

    this.primaryWeapon = new NormalGoodShot();
    this.secondaryWeapon = new ChargeCannon();

    this.shield = 100;
    this.maxShield = 100;

    // Can be 'right' or 'left';
    this.direction = 'right';

    this.reapMe = false;
    this.type = 'good_ship';

    this.physics = new Physics(startPoint.clone());

    this.draw = function() {
        // For camera use later
        var oldX = this.currPoint.X;
        var oldY = this.currPoint.Y;

        var CAMERAEDGE = 75;

        if (this.shield <= 0) {
            // TODO: Die method.
            // I have been shot.
            this.reapMe = true;
            var explodeMe = new Explosion(this.currPoint);
            state.drawObjects.push(explodeMe);
        }

        // Draw shield
        Widgets.shield(this.shield, this.maxShield);

        this.currPoint = this.physics.whereTo();

        // Pressed left
        if (kbd.leftArrow && !kbd.rightArrow) {
            this.direction = 'left';
        }

        // Pressed right
        if (kbd.rightArrow && !kbd.leftArrow) {
            this.direction = 'right';
        }

        // Draw firefly
        Widgets.ship('firefly', this.direction, this.currPoint);

        // Fire shots
        if (kbd.ctrl == true) {
            this.primaryWeapon.fire(this.direction, this.currPoint);
        } else {
            this.primaryWeapon.nofire();
        }

        if (kbd.shift == true) {
            this.secondaryWeapon.fire(this.direction, this.currPoint);
        } else {
            this.secondaryWeapon.nofire();
        }

        // draw smoke
        var smokePoint = new Point(0, Math.random()*12 + this.currPoint.Y);
        if (this.direction == 'right') {
            smokePoint.X = this.currPoint.X - 2;
        } else if (this.direction == 'left') {
            smokePoint.X = this.currPoint.X + 25;
        }
        var smoke = new Smoke(smokePoint);
        state.drawObjects.push(smoke);

        // Draw weapon state.

        // Draw plasma damage indicator boxes
        Widgets.indicator('Power', state.camera.move(10, 574), new Color(0, 255, 0), this.primaryWeapon.possibleDamage, this.primaryWeapon.damage);

        // Draw plasma output indicator boxes
        Widgets.indicator('Output', state.camera.move(270, 574), new Color(255, 255, 0), this.primaryWeapon.possibleShots, this.primaryWeapon.shots);

        // Draw plasma cooler indicator boxes
        Widgets.indicator('Cooler', state.camera.move(540, 574), new Color(64, 64, 255), this.primaryWeapon.possibleSpeed, this.primaryWeapon.speed);

        // Draw number of plasma shots
        state.ctx.fillStyle = 'white';
        state.ctx.fillText('Plasma: ' + this.primaryWeapon.plasmaShots, state.camera.X + 270, state.camera.Y + 560);

        // Draw secondary weapon status
        this.secondaryWeapon.drawStatus();

        // Track camera
        // only get within 50 pixels of the edge.
        // max speed within the edge is 15 px/frame. Outside is 10 px/frame.
        var changeX = oldX - this.currPoint.X;
        var changeY = oldY - this.currPoint.Y;

        var MAXSPEED = 14;
        var MINSPEED = 8;

        if (changeX > MINSPEED) {
            changeX = MINSPEED;
        } else if (changeX < -MINSPEED) {
            changeX = -MINSPEED;
        }
        if (changeY > MINSPEED) {
            changeY = MINSPEED;
        } else if (changeY < -MINSPEED) {
            changeY = -MINSPEED;
        }

        state.camera.X -= changeX;
        state.camera.Y -= changeY;
        state.ctx.translate(changeX, changeY);
    }

    this.handlePowerup = function(powerUp) {
        switch (powerUp.category) {
            case 'shield':
                this.shield += 10;
                if (this.shield > this.maxShield) {
                    this.shield = this.maxShield;
                }
                playSound('data/sound/shield');
                break;
            case 'shots':
                if (this.primaryWeapon.shots < this.primaryWeapon.possibleShots) {
                    this.primaryWeapon.shots += 1;
                } else {
                    // TODO: add notification
                }
                playSound('data/sound/item');
                break;
            case 'damage':
                if (this.primaryWeapon.damage < this.primaryWeapon.possibleDamage) {
                    this.primaryWeapon.damage += 1;
                }
                playSound('data/sound/item');
                break;
            case 'rate':
                if (this.primaryWeapon.speed < this.primaryWeapon.possibleSpeed) {
                    this.primaryWeapon.speed += 1;
                }
                playSound('data/sound/item');
                break;
            case 'superCharge':
                this.gfx = gameImages['superCharge'];
                break;
            case 'pod':
                this.gfx = gameImages['pod'];
                break;
            case 'ore':
                // randomly select one of several ore pictures.
                this.gfx = gameImages['ore' + (Math.floor(Math.random() * 3) + 1)];
                break;
            case 'cash':
                this.gfx = gameImages['dollar'];
                break;
            case 'rockets':
                this.secondaryWeapon.missles += powerUp.val;
                playSound('data/sound/item');
                break;
            case 'cargo':
                this.gfx = gameImages['cargo1'];
                break;
            case 'plasma':
                this.primaryWeapon.plasmaShots += powerUp.val;
                playSound('data/sound/item');
                break;
        }
    }
}
