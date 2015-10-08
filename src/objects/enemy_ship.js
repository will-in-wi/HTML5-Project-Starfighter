import NoWeapon from 'weapons/no_weapon.js';
import Point from 'point.js';
import Smoke from 'objects/smoke.js';

// Objects must have the draw function, the reapMe property, and the type property.
// The type property has five states: good_shot, bad_shot, good_ship, bad_ship, no_explode, pickup.

// Enemy Ship
class EnemyShip {
  constructor(ai, ship, shield, primaryWeapon) {
    var loc = ai.whereTo();
    this.AI = ai
    this.currPoint = loc;
    this.ship = ship;
    this.destroyStep = 5;
    this.destroyStepFirst = true;
    this.direction = 'right';

    // Used for cutscenes, menus, etc...
    // TODO: Replace with shield = null.
    this.noShield = false;

    this.shield = shield;
    this.maxShield = shield;

    this.primaryWeapon = primaryWeapon;
    this.secondaryWeapon = new NoWeapon();

    // Shot limiter
    this.shotState = 10;

    // collision box
    this.width = gameImages[ship + "1"].width;
    this.height = gameImages[ship + "1"].height;

    this.reapMe = false;
    this.type = "bad_ship";
  }

  die() {
    this.reapMe = true;
    var explode = new Explosion(this.currPoint);
    window.game_state.drawObjects.push(explode);
  }

  draw() {
    if (this.shield <= 0) {
      this.die();
      return;
    }

    // Get new location from AI.
    var newPoint = this.AI.whereTo();

    // determine left vs. right from change in X.
    if (newPoint.X > this.currPoint.X) {
      this.direction = 'right';
    } else if (newPoint.X < this.currPoint.X) {
      this.direction = 'left';
    }

    this.currPoint = newPoint;

    // Add arrow if object is off screen.
    if (this.currPoint.X < window.game_state.camera.X || this.currPoint.X > window.game_state.camera.X + 800 || this.currPoint.Y < window.game_state.camera.Y || this.currPoint.Y > window.game_state.camera.Y + 600) {
      // Show arrow on edge of screen
      if (this.currPoint.X < window.game_state.camera.X && this.currPoint.Y < window.game_state.camera.Y) { // upper left corner
        window.game_state.ctx.drawImage(gameImages["arrowNorthWest"], window.game_state.camera.X + 2, window.game_state.camera.Y + 2);
      } else if (this.currPoint.X < window.game_state.camera.X && this.currPoint.Y > window.game_state.camera.Y + 600) { // lower left corner
        window.game_state.ctx.drawImage(gameImages["arrowSouthWest"], window.game_state.camera.X + 2, window.game_state.camera.Y + 585);
      } else if (this.currPoint.X > window.game_state.camera.X + 800 && this.currPoint.Y < window.game_state.camera.Y) { // upper right corner
        window.game_state.ctx.drawImage(gameImages["arrowNorthEast"], window.game_state.camera.X + 785, window.game_state.camera.Y + 2);
      } else if (this.currPoint.X > window.game_state.camera.X + 800 && this.currPoint.Y > window.game_state.camera.Y + 600) { // lower right corner
        window.game_state.ctx.drawImage(gameImages["arrowSouthEast"], window.game_state.camera.X + 785, window.game_state.camera.Y + 585);
      } else if (this.currPoint.X < window.game_state.camera.X) { // Left side
        window.game_state.ctx.drawImage(gameImages["arrowWest"], window.game_state.camera.X + 2, this.currPoint.Y);
      } else if (this.currPoint.X > window.game_state.camera.X + 800) { // Right Side
        window.game_state.ctx.drawImage(gameImages["arrowEast"], window.game_state.camera.X + 785, this.currPoint.Y);
      } else if (this.currPoint.Y < window.game_state.camera.Y) { // Top side
        window.game_state.ctx.drawImage(gameImages["arrowNorth"], this.currPoint.X, window.game_state.camera.Y + 2);
      } else if (this.currPoint.Y > window.game_state.camera.Y + 600) { // Bottom side
        window.game_state.ctx.drawImage(gameImages["arrowSouth"], this.currPoint.X, window.game_state.camera.Y + 585);
      }
    } else {
      // Draw ship
      if (this.direction == 'right') {
        window.game_state.ctx.drawImage(gameImages[this.ship + "1"], this.currPoint.X, this.currPoint.Y);
      } else if (this.direction == 'left')  {
        window.game_state.ctx.drawImage(gameImages[this.ship + "2"], this.currPoint.X, this.currPoint.Y);
      }

      // Draw shield above ship
      if (!this.noShield) {
        Widgets.ship_shield(this.shield, this.maxShield, gameImages[this.ship + "1"].width, this.currPoint);
      }

      // draw smoke
      var smokePoint = new Point(0, Math.random()*gameImages[this.ship + "1"].height + this.currPoint.Y);
      if (this.direction == 'right') {
        smokePoint.X = this.currPoint.X - 2;
      } else if (this.direction == 'left') {
        smokePoint.X = this.currPoint.X + 25;
      }
      var smoke = new Smoke(smokePoint);
      window.game_state.drawObjects.push(smoke);
    }

    // Fire if Firefly is in front.
    if (window.game_state.firefly) { // Firefly does not exist in menu
      if (this.currPoint.Y + 10 > window.game_state.firefly.currPoint.Y && this.currPoint.Y - 10 < window.game_state.firefly.currPoint.Y) { // Firefly is in line of fire.
        // Shoot
        if (this.direction == 'right') { // Shoot right
          if (this.currPoint.X < window.game_state.firefly.currPoint.X) {
            this.primaryWeapon.fire(this.direction, this.currPoint);
          } else {
            this.primaryWeapon.nofire();
          }
        } else { // Shoot left
          if (this.currPoint.X > window.game_state.firefly.currPoint.X) {
            this.primaryWeapon.fire(this.direction, this.currPoint);
          } else {
            this.primaryWeapon.nofire();
          }
        }
      } else {
        this.primaryWeapon.nofire();
      }
    }
  }
}

export default EnemyShip;
