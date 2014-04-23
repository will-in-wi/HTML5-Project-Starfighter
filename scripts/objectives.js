'use strict';

// Objectives


// Done when all enemies have been killed.
function allKilled(objects) {
    var allGone = true;
    $(objects).each(function(i, obj) {
        if (obj.type == 'bad_ship') {
            allGone = false;
        }
    });
    return allGone;
}
