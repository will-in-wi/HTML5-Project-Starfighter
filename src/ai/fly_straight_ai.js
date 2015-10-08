'use strict';

// To be used for CutScenes
function FlyStraightAI(speed, startPoint) {
    this.currPoint = startPoint.clone();
    this.speed = speed;

    this.whereTo = function() {
        this.currPoint.X += this.speed;

        return this.currPoint;
    }
}
