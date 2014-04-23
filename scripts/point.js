'use strict';

// Point object
function Point(x, y) {
    this.X = x;
    this.Y = y;

    this.move = function(x, y) {
        return new Point(this.X + x, this.Y + y)
    }
}
