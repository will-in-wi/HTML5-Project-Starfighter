'use strict';

// The firefly fighter
function Firefly(startPoint) {

    var state = window.game_state;

    this.currPoint = startPoint;
    this.width = gameImages['firefly1'].width;
    this.height = gameImages['firefly1'].height;

    this.Xspeed = 0;
    this.Yspeed = 0;

    this.maxSpeedX = 14;
    this.maxSpeedY = 14;

    this.primaryWeapon = new NormalGoodShot();
    this.secondaryWeapon = new ChargeCannon();

    this.shield = 100;
    this.maxShield = 100;

    // Can be 'right' or 'left';
    this.direction = 'right';

    // Make it easier to detect whether this object is the firefly.
    this.firefly = true;

    this.reapMe = false;
    this.type = 'good_ship';

    this.draw = function() {
        // For camera use later
        var oldX = this.currPoint.X;
        var oldY = this.currPoint.Y;

        var MAXSPEED = 14;
        var MINSPEED = 8;
        var CAMERAEDGE = 75;

        if (this.shield <= 0) {
            // I have been shot.
            this.reapMe = true;
            var explodeMe = new Explosion(this.currPoint);
            state.drawObjects.push(explodeMe);
        }

        // Draw shield
        Widgets.shield(this.shield, this.maxShield);

        // Handle keyboard ********************
        // Pressed down
        if (kbd.downArrow && !kbd.upArrow) {
            // Track camera edge
            if (state.cameraY + 600 - this.currPoint.Y < CAMERAEDGE) {
                this.maxSpeedY = MINSPEED;
            } else {
                this.maxSpeedY = MAXSPEED;
            }

            // Move ship
            if (this.Yspeed < this.maxSpeedY) {
                this.Yspeed = this.Yspeed + 4;
                if (this.Yspeed > this.maxSpeedY) {
                    this.Yspeed = this.maxSpeedY;
                }
            } else {
                this.Yspeed = this.maxSpeedY;
            }
            this.currPoint.Y = this.currPoint.Y + this.Yspeed;
        }

        // Pressed Up
        if (kbd.upArrow && !kbd.downArrow) {
            // Track camera edge
            if (this.currPoint.Y - state.cameraY < CAMERAEDGE) {
                this.maxSpeedY = MINSPEED;
            } else {
                this.maxSpeedY = MAXSPEED;
            }

            // Move Firefly
            if (this.Yspeed > -this.maxSpeedY) {
                this.Yspeed = this.Yspeed - 3;
                if (this.Yspeed < -this.maxSpeedY) {
                    this.Yspeed = -this.maxSpeedY;
                }
            } else {
                this.Yspeed = -this.maxSpeedY;
            }
            this.currPoint.Y = this.currPoint.Y + this.Yspeed;
        }

        // Pressed left
        if (kbd.leftArrow && !kbd.rightArrow) {
            // Track camera edge
            if (this.currPoint.X - state.cameraX < CAMERAEDGE) {
                this.maxSpeedX = MINSPEED;
            } else {
                this.maxSpeedX = MAXSPEED;
            }

            // Set image direction
            this.direction = 'left';

            // Move Firefly
            if (this.Xspeed > -this.maxSpeedX) {
                this.Xspeed = this.Xspeed - 3;
                if (this.Xspeed < -this.maxSpeedX) {
                    this.Xspeed = -this.maxSpeedX;
                }
            } else {
                this.Xspeed = -this.maxSpeedX;
            }
            this.currPoint.X = this.currPoint.X + this.Xspeed;
        }

        // Pressed right
        if (kbd.rightArrow && !kbd.leftArrow) {
            // Track camera edge
            if (state.cameraX + 800 - this.currPoint.X < CAMERAEDGE) {
                this.maxSpeedX = MINSPEED;
            } else {
                this.maxSpeedX = MAXSPEED;
            }

            // Set image direction
            this.direction = 'right';

            // Move Firefly
            if (this.Xspeed < this.maxSpeedX) {
                this.Xspeed = this.Xspeed + 4;
                if (this.Xspeed > this.maxSpeedX) {
                    this.Xspeed = this.maxSpeedX;
                }
            } else {
                this.Xspeed = this.maxSpeedX;
            }
            this.currPoint.X = this.currPoint.X + this.Xspeed;
        }

        // Neither left nor right pressed, or both. Slow firefly.
        if ((!kbd.rightArrow && !kbd.leftArrow) || (kbd.rightArrow && kbd.leftArrow)) {
            this.Xspeed = this.Xspeed * 0.97;
            this.currPoint.X = this.currPoint.X + this.Xspeed;
        }

        // Neither up nor down pressed, or both. Slow firefly.
        if ((!kbd.upArrow && !kbd.downArrow) || (kbd.upArrow && kbd.downArrow)) {
            this.Yspeed = this.Yspeed * 0.97;
            this.currPoint.Y = this.currPoint.Y + this.Yspeed;
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
        Widgets.indicator('Power', new Point(state.cameraX + 10, state.cameraY + 574), new Color(0, 255, 0), this.primaryWeapon.possibleDamage, this.primaryWeapon.damage);

        // Draw plasma output indicator boxes
        Widgets.indicator('Output', new Point(state.cameraX + 270, state.cameraY + 574), new Color(255, 255, 0), this.primaryWeapon.possibleShots, this.primaryWeapon.shots);

        // Draw plasma cooler indicator boxes
        Widgets.indicator('Cooler', new Point(state.cameraX + 540, state.cameraY + 574), new Color(64, 64, 255), this.primaryWeapon.possibleSpeed, this.primaryWeapon.speed);

        // Draw number of plasma shots
        state.ctx.fillStyle = 'white';
        state.ctx.fillText('Plasma: ' + this.primaryWeapon.plasmaShots, state.cameraX + 270, state.cameraY + 560);

        // Draw secondary weapon status
        this.secondaryWeapon.drawStatus();

        // Track camera
        // only get within 50 pixels of the edge.
        // max speed within the edge is 15 px/frame. Outside is 10 px/frame.
        var changeX = oldX - this.currPoint.X;
        var changeY = oldY - this.currPoint.Y;

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

        state.cameraX -= changeX;
        state.cameraY -= changeY;
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
