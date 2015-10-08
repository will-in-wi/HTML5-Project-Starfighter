// To be used for CutScenes
class FlyStraightAI {
  constructor(speed, startPoint) {
    this.currPoint = startPoint.clone();
    this.speed = speed;
  }

  whereTo() {
    this.currPoint.X += this.speed;
    return this.currPoint;
  }
}

export default FlyStraightAI;
