import Debug from 'debug.js';
import StarfighterState from 'state.js';
import PreloadImages from 'preload.js';
import MainMenu from 'scenes/main_menu.js';

Debug.log('Document Ready.');

window.game_state = new StarfighterState();

// Preloading images
window.gameImages = {};
var preload = new PreloadImages('data/gfx/', 'preload.json');

preload.preload().then(function(images){
  window.gameImages = images;

  Debug.log('Starting menu.');
  var currScene = new MainMenu();
  currScene.main_loop();
});
