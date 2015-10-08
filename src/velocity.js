'use strict';

function Velocity() {
    this.speed = 0;

    this.maxSpeed = 14;

    this.FRICTION = 0.97;
    this.ACCELERATION = 4;

    this.apply_force = function(direction) {
        if (direction > 0) {
            this.speed += this.ACCELERATION;
        } else if (direction < 0) {
            this.speed -= this.ACCELERATION;
        } else {
            // Friction
            this.speed *= this.FRICTION;
        }

        // Max out
        if (this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
        } else if (this.speed < -this.maxSpeed) {
            this.speed = -this.maxSpeed;
        }
    }
}
