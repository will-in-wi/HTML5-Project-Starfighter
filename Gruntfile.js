/*global module, require*/
module.exports = function(grunt) {
  "use strict";

  require("load-grunt-tasks")(grunt);

  grunt.loadNpmTasks("grunt-contrib-watch");

  grunt.initConfig({
    watch: {
      scripts: {
        files: ["src/**/*.js"],
        tasks: ["default"]
      }
    },
    eslint: {
      target: [
        "src/**/*.js"
      ]
    },
    "babel": {
      options: {
        sourceMap: true,
        modules: "system"
      },
      dist: {
        files: {
          "dist/color.js": "src/color.js",
          "dist/debug.js": "src/debug.js",
          "dist/events.js": "src/events.js",
          "dist/keyboard.js": "src/keyboard.js",
          "dist/main.js": "src/main.js",
          "dist/misc.js": "src/misc.js",
          "dist/mission.js": "src/mission.js",
          "dist/objects.js": "src/objects.js",
          "dist/physics.js": "src/physics.js",
          "dist/point.js": "src/point.js",
          "dist/preload.js": "src/preload.js",
          "dist/ships.js": "src/ships.js",
          "dist/state.js": "src/state.js",
          "dist/tracker.js": "src/tracker.js",
          "dist/util.js": "src/util.js",
          "dist/velocity.js": "src/velocity.js",
          "dist/widgets.js": "src/widgets.js",
          "dist/ai/fly_straight_ai.js": "src/ai/fly_straight_ai.js",
          "dist/ai/menu_ai.js": "src/ai/menu_ai.js",
          "dist/ai/normal_ai.js": "src/ai/normal_ai.js",
          "dist/objectives/all_killed.js": "src/objectives/all_killed.js",
          "dist/objects/enemy_ship.js": "src/objects/enemy_ship.js",
          "dist/objects/explosion.js": "src/objects/explosion.js",
          "dist/objects/firefly.js": "src/objects/firefly.js",
          "dist/objects/power_up.js": "src/objects/power_up.js",
          "dist/objects/rocket.js": "src/objects/rocket.js",
          "dist/objects/shot.js": "src/objects/shot.js",
          "dist/objects/smoke.js": "src/objects/smoke.js",
          "dist/scenes/briefing.js": "src/scenes/briefing.js",
          "dist/scenes/cut_scene.js": "src/scenes/cut_scene.js",
          "dist/scenes/game.js": "src/scenes/game.js",
          "dist/scenes/main_menu.js": "src/scenes/main_menu.js",
          "dist/scenes/scroller.js": "src/scenes/scroller.js",
          "dist/weapons/charge_cannon.js": "src/weapons/charge_cannon.js",
          "dist/weapons/laser.js": "src/weapons/laser.js",
          "dist/weapons/missle.js": "src/weapons/missle.js",
          "dist/weapons/no_weapon.js": "src/weapons/no_weapon.js",
          "dist/weapons/normal_bad_shot.js": "src/weapons/normal_bad_shot.js",
          "dist/weapons/normal_good_shot.js": "src/weapons/normal_good_shot.js"
        }
      }
    }
  });

  grunt.registerTask("default", ["eslint", "babel"]);
};
