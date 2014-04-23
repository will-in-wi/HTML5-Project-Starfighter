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
