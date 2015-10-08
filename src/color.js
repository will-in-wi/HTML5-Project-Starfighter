class Color {
  constructor(red, green, blue) {
    if (red > 255 || red < 0) {
        throw 'Red color out of range: ' + red;
    }

    if (green > 255 || green < 0) {
        throw 'Green color out of range: ' + green;
    }

    if (blue > 255 || blue < 0) {
        throw 'Blue color out of range: ' + blue;
    }

    this.red = red;
    this.green = green;
    this.blue = blue;
  }

  hex() {
    // Outputs hexadecimal RGB color.
    return '#' + ("00" + this.red.toString(16)).substr(-2, 2) + ("00" + this.green.toString(16)).substr(-2, 2) + ("00" + this.blue.toString(16)).substr(-2, 2)
  }

  transform(amount) {
    if (amount < -1 || amount > 1) {
      throw 'Amount out of range.';
    }

    return new Color(Math.ceil(this.red * amount), Math.ceil(this.green * amount), Math.ceil(this.blue * amount));
  }
}

export default Color;
