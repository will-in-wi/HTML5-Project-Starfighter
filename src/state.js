import Point from 'point.js';

var StarfighterState = function() {
    // Data that retains state throughout playback.

    var state = this;

    // Canvas context.
    var canvas = document.getElementById('game');
    state.ctx = canvas.getContext('2d');

    state.reset = function() {
        state.camera = new Point(0, 0);

        state.starfieldBack = [];
        state.starfieldMiddle = [];
        state.starfieldFront = [];

        state.drawObjects = [];

        state.firefly = null;
    }

    state.reset();
}

export default StarfighterState;
