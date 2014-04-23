'use strict';

// To be used for CutScenes
function FlyStraightAI(speed, startPoint) {
    this.currPoint = $.extend(true, {}, startPoint);
    this.speed = speed;

    this.whereTo = function() {
        this.currPoint.X += this.speed;

        return this.currPoint;
    }
}
