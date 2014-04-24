'use strict';

$(document).ready(function() {
    // Start preloading with images
    window.gameImages = {};

    var preload = new PreloadImages('data/gfx/', 'preload.json');

    preload.preload().done(function(images){
        window.gameImages = images;

        Debug.log('Starting menu.');
        var currScene = new MainMenu();
        currScene.main_loop();
    });

    window.game_state = new StarfighterState();

});
