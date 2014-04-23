StarfighterState = function() {
    // Data that retains state throughout playback.

    var state = this;

    // Canvas context.
    var canvas = document.getElementById('game');
    state.ctx = canvas.getContext('2d');

    state.reset = function() {
        state.cameraX = 0;
        state.cameraY = 0;

        state.starfieldBack = [];
        state.starfieldMiddle = [];
        state.starfieldFront = [];

        state.drawObjects = [];

        state.firefly = null;
    }

    state.reset();
}
