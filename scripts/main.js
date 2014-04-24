'use strict';

document.onreadystatechange = function() { if (document.readyState === 'complete') {
    Debug.log('Document Ready.');

    window.game_state = new StarfighterState();

    // Preloading images
    window.gameImages = {};
    var preload = new PreloadImages('data/gfx/', 'preload.json');

    preload.preload().done(function(images){
        window.gameImages = images;

        Debug.log('Starting menu.');
        var currScene = new MainMenu();
        currScene.main_loop();
    });
}};
