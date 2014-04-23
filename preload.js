// This is awful. I would love to come up with a cleaner way to do this.
// Basically, what happens is that each function loads an image, and once
// that image is loaded, it loads the next one. Once the last image is loaded,
// it starts the main loop.
$(document).ready(function() {
  // Start preloading with images
  window.gameImages = [];

  var objects = ["aimFighter1.png",
                  "aimFighter2.png",
                  "alienDevice.png",
                  "arrowEast.png",
                  "arrowNorth.png",
                  "arrowNorthEast.png",
                  "arrowNorthWest.png",
                  "arrowSouth.png",
                  "arrowSouthEast.png",
                  "arrowSouthWest.png",
                  "arrowWest.png",
                  "asteroid1.png",
                  "asteroid2.png",
                  "asteroid3.png",
                  "barrier.png",
                  "buyIcon.png",
                  "cargo1.png",
                  "chainLink.png",
                  "cloakShip1.png",
                  "cloakShip2.png",
                  "credits.jpg",
                  "cursor.png",
                  "dollar.png",
                  "drone1.png",
                  "drone2.png",
                  "dualFighter1.png",
                  "dualFighter2.png",
                  "elec1.png",
                  "elec2.png",
                  "elec3.png",
                  "elec4.png",
                  "eliteFighter1.png",
                  "eliteFighter2.png",
                  "escort1.png",
                  "escort2.png",
                  "evilUrsula1.png",
                  "evilUrsula2.png",
                  "execTrans1.png",
                  "execTrans2.png",
                  "explode05.png",
                  "explode06.png",
                  "explode07.png",
                  "explode08.png",
                  "explode1.png",
                  "explode10.png",
                  "explode11.png",
                  "explode12.png",
                  "explode13.png",
                  "explode14.png",
                  "explode15.png",
                  "explode16.png",
                  "explode2.png",
                  "explode3.png",
                  "explode4.png",
                  "explode9.png",
                  "eyananth.jpg",
                  "face_chris.png",
                  "face_crew.png",
                  "face_kline.png",
                  "face_krass.png",
                  "face_phoebe.png",
                  "face_sid.png",
                  "face_ursula.png",
                  "firefly1.png",
                  "firefly2.png",
                  "frigateBody1.png",
                  "frigateBody2.png",
                  "frigateGun11.png",
                  "frigateGun12.png",
                  "frigateGun21.png",
                  "frigateGun22.png",
                  "gameover.png",
                  "goodTrans1.png",
                  "goodTrans2.png",
                  "greenDir.png",
                  "heart.png",
                  "icon1.png",
                  "icon10.png",
                  "icon11.png",
                  "icon12.png",
                  "icon13.png",
                  "icon14.png",
                  "icon15.png",
                  "icon16.png",
                  "icon17.png",
                  "icon18.png",
                  "icon19.png",
                  "icon2.png",
                  "icon20.png",
                  "icon21.png",
                  "icon22.png",
                  "icon23.png",
                  "icon24.png",
                  "icon25.png",
                  "icon26.png",
                  "icon3.png",
                  "icon4.png",
                  "icon5.png",
                  "icon6.png",
                  "icon7.png",
                  "icon8.png",
                  "icon9.png",
                  "iconBase.png",
                  "kline11.png",
                  "kline12.png",
                  "merc1.png",
                  "merc2.png",
                  "mine.png",
                  "mineBoss1.png",
                  "mineBoss2.png",
                  "mineBossWing11.png",
                  "mineBossWing12.png",
                  "mineBossWing21.png",
                  "mineBossWing22.png",
                  "mineBossWing31.png",
                  "mineBossWing32.png",
                  "mineBossWing41.png",
                  "mineBossWing42.png",
                  "miner1.png",
                  "miner2.png",
                  "missileBoat1.png",
                  "missileBoat2.png",
                  "mobileCannon1.png",
                  "mobileCannon2.png",
                  "mobileShield1.png",
                  "mobileShield2.png",
                  "mordor.jpg",
                  "ore1.png",
                  "ore2.png",
                  "ore3.png",
                  "planet_blue.png",
                  "planet_green.png",
                  "planet_orange.png",
                  "planet_red.png",
                  "planet_sun.png",
                  "plasmaAmmo.png",
                  "plasmaDamage.png",
                  "plasmaGreen.png",
                  "plasmaRate.png",
                  "plasmaRed.png",
                  "plutoBoss1.png",
                  "plutoBoss2.png",
                  "pod.png",
                  "prlogo.png",
                  "rebelCarrier1.png",
                  "rebelCarrier2.png",
                  "redDir.png",
                  "rocket.png",
                  "rocket1.png",
                  "rocket2.png",
                  "rocketAmmo.png",
                  "sellIcon.png",
                  "sflogo.png",
                  "sid1.png",
                  "sid2.png",
                  "slaveTrans1.png",
                  "slaveTrans2.png",
                  "smallFont.png",
                  "sol.jpg",
                  "spirit.jpg",
                  "splitBoss11.png",
                  "splitBoss12.png",
                  "splitBoss21.png",
                  "splitBoss22.png",
                  "splitBoss31.png",
                  "splitBoss32.png",
                  "startUp.jpg",
                  "stunBolt.png",
                  "superCharge.png",
                  "targetText.png",
                  "transport1.png",
                  "transport2.png",
                  "tug1.png",
                  "tug2.png",
                  "wingmate1.png",
                  "wingmate2.png"];

  load_object();

  function load_object() {
    if (objects.length != 0) {
      var imgName = objects.shift();
      var img = new Image();
      $(img).load(function() {
        gameImages[imgName.substr(0, imgName.length - 4)] = img;
        load_object();
      });
      img.src = '';
      img.src = 'data/gfx/' + imgName;
    } else {
      //start_game();
      main_menu();
    }
  }
});
