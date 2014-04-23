function PowerUp(category, startLoc, val) {

    // Make sure we copy the startLoc variable.
    this.currPoint = $.extend(true, {}, startLoc);

    // Can be 'shield', 'shots', 'damage', 'rate', 'superCharge', 'pod', 'ore', 'cash', 'rockets', 'cargo', or 'plasma'.
    this.category = category;

    // Value of whatever the powerup is. Ignored for 'shield', 'shots', 'damage', 'superCharge', 'cargo', and 'rate'.
    this.val = val;

    // Distance traveled in px/frame.
    this.maxSpeed = 2;

    // Speed of travel for X and Y.
    this.Xspeed = Math.floor(Math.random()*(this.maxSpeed*2)) - this.maxSpeed;
    this.Yspeed = Math.floor(Math.random()*(this.maxSpeed*2)) - this.maxSpeed;

    // Lifespan of powerUp in frames.
    this.lifeSpan = 200;

    // Number for frames this has existed for.
    this.life = 0;

    // Use correct graphic
    this.gfx = '';
    switch (this.category) {
        case 'shield':
            this.gfx = gameImages['heart'];
            break;
        case 'shots':
            this.gfx = gameImages['plasmaAmmo'];
            break;
        case 'damage':
            this.gfx = gameImages['plasmaDamage'];
            break;
        case 'rate':
            this.gfx = gameImages['plasmaRate'];
            break;
        case 'superCharge':
            this.gfx = gameImages['superCharge'];
            break;
        case 'pod':
            this.gfx = gameImages['pod'];
            break;
        case 'ore':
            // randomly select one of several ore pictures.
            this.gfx = gameImages['ore' + (Math.floor(Math.random() * 3) + 1)];
            break;
        case 'cash':
            this.gfx = gameImages['dollar'];
            break;
        case 'rockets':
            this.gfx = gameImages['rocketAmmo'];
            break;
        case 'cargo':
            this.gfx = gameImages['cargo1'];
            break;
        case 'plasma':
            this.gfx = gameImages['rocket'];
            break;
    }

    this.reapMe = false;
    this.type = 'pickup';

    this.width = 19;
    this.height = 19;
}

PowerUp.prototype.draw = function(ctx) {
    // Calculate new location.
    this.currPoint.X += this.Xspeed;
    this.currPoint.Y += this.Yspeed;

    this.life += 1;

    if (this.life >= this.lifeSpan) {
        this.reapMe = true;
    }

    // Draw powerup
    ctx.drawImage(this.gfx, this.currPoint.X, this.currPoint.Y);
}
