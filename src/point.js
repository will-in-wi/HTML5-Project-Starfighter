// Point object
class Point {
  constructor(x, y) {
    this.X = x;
    this.Y = y;
  }

  move(x, y) {
    return new Point(this.X + x, this.Y + y);
  }

  clone() {
    return new Point(this.X, this.Y);
  }
}

export default Point;
