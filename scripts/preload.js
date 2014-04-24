'use strict';

// This is awful. I would love to come up with a cleaner way to do this.
// Basically, what happens is that each function loads an image, and once
// that image is loaded, it loads the next one. Once the last image is loaded,
// it starts the main loop.
$(document).ready(function() {
    // Start preloading with images
    window.gameImages = {};

    var gfxLocation = 'data/gfx/';

    Debug.log('Beginning image preload.');
    $.getJSON(gfxLocation + 'preload.json', function(data) {

        Debug.log('Image Preload JSON returned, beginning to preload images.');

        var promises = [];

        for (var i = 0; i < data.length; i++) {
            promises.push(load_object(data[i]));
        }

        $.when.apply($, promises).done(function(){
            Debug.log('Image preload finished, starting menu.');
            var currScene = new MainMenu();
            currScene.main_loop();
        });
    });

    window.game_state = new StarfighterState();

    function load_object(image) {
        var deferred = new jQuery.Deferred();
        var img = new Image();
        $(img).load(function() {
            window.gameImages[image.substr(0, image.length - 4)] = img;
            console.log(gameImages);
            deferred.resolve();
        });
        img.src = '';
        img.src = gfxLocation + image;
        return deferred;
    }
});
