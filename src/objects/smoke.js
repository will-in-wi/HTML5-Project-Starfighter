// Smoke
class Smoke {
  constructor(startPoint) {
    this.currPoint = startPoint;

    this.step = 1;

    this.reapMe = false;
    this.type = "no_explode";
  }

  draw(ctx) {
    var img = new Image();
    switch (this.step) {
      case 1:
      case 2:
        window.game_state.ctx.fillStyle = 'white';
        window.game_state.ctx.fillRect(this.currPoint.X, this.currPoint.Y, 3, 3);
        break;
      case 3:
      case 4:
        window.game_state.ctx.fillStyle = 'yellow';
        window.game_state.ctx.fillRect(this.currPoint.X, this.currPoint.Y, 3, 3);
        break;
      case 5:
      case 6:
        window.game_state.ctx.fillStyle = 'orange';
        window.game_state.ctx.fillRect(this.currPoint.X, this.currPoint.Y, 3, 3);
        break;
      case 7:
      case 8:
        window.game_state.ctx.fillStyle = 'red';
        window.game_state.ctx.fillRect(this.currPoint.X, this.currPoint.Y, 3, 3);
        break;
      default:
        this.reapMe = true;
    }
    this.step = this.step + 1;
  }
}

export default Smoke;
