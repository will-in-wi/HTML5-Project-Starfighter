'use strict';

var Ships = {
    dualFighter : function() {
        var ai = new AI(100, new Point(Math.random()*800, Math.random()*600));
        var weapon = new NormalBadShot();
        var badguy = new EnemyShip(ai, 'dualFighter', 50, weapon);
        return badguy;
    },
    transport : function() {
        var ai = new AI(100, new Point(Math.random()*800, Math.random()*600));
        var weapon = new NoWeapon();
        var badguy = new EnemyShip(ai, 'transport', 50, weapon);
        return badguy;
    }
}
