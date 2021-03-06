'use strict';

function MenuAI(attack, startPoint) {
    this.attack = attack;
    this.goalPoint = startPoint;
    this.currentPoint = startPoint;
    this.speed = Math.floor(Math.random()*5 + 1);

    this.whereTo = function() {
        var retPoint = new Point(this.currentPoint.X + this.speed, this.currentPoint.Y);
        if (retPoint.X > 800) {
            retPoint.X = 0;
        }
        this.currentPoint = retPoint;
        return retPoint;
    }
}
