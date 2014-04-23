'use strict';

// An objective has a title and description, but must also implement the
// completed function which checks to see whether the objective has
// been completed.
function Objective(title, description) {
    this.title = title;
    this.description = description;

    this.completed = function(objects) {
        // this should be implemented by a subclassing object.
        return true;
    }
}

// objectives is an array of objective objects.
function Mission(objectives, title, description) {
    this.objectives = objectives;
    this.completedObjectives = [];
    this.title = title;
    this.description = description;

    this.completed = function() {
        for (var objective in this.objectives) {

        }
    }
}

// AI object
function AI(attack, startPoint) {

    var state = window.game_state;

    this.goalPoint = startPoint;
    this.currPoint = startPoint;

    // if 0, then doing something. Otherwise, counts down every frame.
    this.wait = 0;

    this.attack = attack;

    this.whereTo = function() {
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
                this.goalPoint.X = Math.floor(Math.random()*800) + state.firefly.currPoint.X - 400;
                this.goalPoint.Y = Math.floor(Math.random()*800) + state.firefly.currPoint.Y - 400;
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
}


// To be used for CutScenes
function FlyStraightAI(speed, startPoint) {
    this.currPoint = $.extend(true, {}, startPoint);
    this.speed = speed;

    this.whereTo = function() {
        this.currPoint.X += this.speed;

        return this.currPoint;
    }
}


// Point object
function Point(x, y) {
    this.X = x;
    this.Y = y;
}
