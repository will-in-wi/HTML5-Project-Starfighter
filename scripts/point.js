'use strict';

// Point object
function Point(x, y) {
    this.X = x;
    this.Y = y;

    this.move = function(x, y) {
        this.X = this.X + x;
        this.Y = this.Y + y;
    }
}
