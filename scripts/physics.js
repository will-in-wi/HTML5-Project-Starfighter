'use strict';

// Essentially a user controlled AI class.
function Physics(currPoint) {

    var state = window.game_state;

    // Constants
    this.MAXSPEED = 14;
    this.MINSPEED = 8;
    this.CAMERAEDGE = 75;

    this.Xspeed = new Velocity();
    this.Yspeed = new Velocity();

    this.maxSpeed = 14;

    this.currPoint = currPoint;

    this.whereTo = function() {

        // Pressed down
        if (kbd.downArrow && !kbd.upArrow) {
            // Track camera edge
            if (state.camera.Y + 600 - this.currPoint.Y < this.CAMERAEDGE) {
                this.Yspeed.maxSpeed = this.MINSPEED;
            } else {
                this.Yspeed.maxSpeed = this.MAXSPEED;
            }

            // Move ship
            this.Yspeed.apply_force(this.direction.down);
            this.currPoint.Y = this.currPoint.Y + this.Yspeed.speed;
        }

        // Pressed Up
        if (kbd.upArrow && !kbd.downArrow) {
            // Track camera edge
            if (this.currPoint.Y - state.camera.Y < this.CAMERAEDGE) {
                this.Yspeed.maxSpeed = this.MINSPEED;
            } else {
                this.Yspeed.maxSpeed = this.MAXSPEED;
            }

            // Move Firefly
            this.Yspeed.apply_force(this.direction.up);
            this.currPoint.Y = this.currPoint.Y + this.Yspeed.speed;
        }

        // Pressed left
        if (kbd.leftArrow && !kbd.rightArrow) {
            // Track camera edge
            if (this.currPoint.X - state.camera.X < this.CAMERAEDGE) {
                this.Xspeed.maxSpeed = this.MINSPEED;
            } else {
                this.Xspeed.maxSpeed = this.MAXSPEED;
            }

            this.Xspeed.apply_force(this.direction.left);
            this.currPoint.X = this.currPoint.X + this.Xspeed.speed;
        }

        // Pressed right
        if (kbd.rightArrow && !kbd.leftArrow) {
            // Track camera edge
            if (state.camera.X + 800 - this.currPoint.X < this.CAMERAEDGE) {
                this.Xspeed.maxSpeed = this.MINSPEED;
            } else {
                this.Xspeed.maxSpeed = this.MAXSPEED;
            }

            this.Xspeed.apply_force(this.direction.right);
            this.currPoint.X = this.currPoint.X + this.Xspeed.speed;
        }

        // Neither left nor right pressed, or both. Slow firefly.
        if ((!kbd.rightArrow && !kbd.leftArrow) || (kbd.rightArrow && kbd.leftArrow)) {
            this.Xspeed.apply_force(this.direction.none);
            this.currPoint.X = this.currPoint.X + this.Xspeed.speed;
        }

        // Neither up nor down pressed, or both. Slow firefly.
        if ((!kbd.upArrow && !kbd.downArrow) || (kbd.upArrow && kbd.downArrow)) {
            this.Yspeed.apply_force(this.direction.none);
            this.currPoint.Y = this.currPoint.Y + this.Yspeed.speed;
        }

        return this.currPoint.clone();
    }

    this.direction = {
        left  : -1,
        right : 1,
        up    : -1,
        down  : 1,
        none  : 0
    }
}
