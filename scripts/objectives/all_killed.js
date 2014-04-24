'use strict';

// Done when all enemies have been killed.
function allKilled(objects) {
    var allGone = true;
    for (var i = 0; i < objects.length; i++) {
        if (objects[i].type == 'bad_ship') {
            allGone = false;
        }
    };
    return allGone;
}
