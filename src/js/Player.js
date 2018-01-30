export default class Player {
  static size = 20;
  static cols = 0;
  static rows = 0;
  static autoRoll = true;

  constructor(tiles) {
    this.x = 0;
    this.y = Player.rows - 1;

    this.color = color(random(0, 255), random(0, 255), random(0, 255));

    this.tiles = tiles;
    this.progress = 0;
    this.deltaX = 0;
    this.deltaY = 0;

    this.autoRoll = Player.autoRoll;

    this.oldX = this.x;
    this.oldY = this.y;

    this.rollInProgress = false;

    this.endYParity = (Player.rows + 1) % 2;
  }

  reset() {
    this.progress = 0;
    this.oldX = this.x;
    this.oldY = this.y;

    this.x = 0;
    this.y = Player.rows - 1;

    this.deltaX = this.x - this.oldX;
    this.deltaY = this.y - this.oldY;
  }

  draw() {
    const { size } = Player;
    fill(this.color);
    stroke(0);
    strokeWeight(size * 0.025);
    const x = size * (this.oldX + 0.5 + (this.deltaX * this.progress));
    const y = size * (this.oldY + 0.5 + (this.deltaY * this.progress));

    if (this.progress < 1) {
      this.progress = Math.min(this.progress + 0.1, 1);
    } else if (!this.rollInProgress && this.autoRoll) {
      this.rollInProgress = true;
      setTimeout(() => this.roll(true), 1000);
    }

    ellipse(x, y, size * 0.75);
  }

  goNFields(n, repeat = 0) {
    this.progress = 0;

    if (repeat === 0) {
      this.oldX = this.x;
      this.oldY = this.y;
    }

    if (this.y % 2 === this.endYParity) {
      this.x++;
    } else {
      this.x--;
    }

    if (this.x >= Player.cols) {
      this.y--;
      this.x--;
    }

    if (this.x < 0) {
      this.y--;
      this.x++;
    }

    if (repeat < n - 1) {
      this.goNFields(n, repeat + 1);
    }

    if (repeat === 0) {
      if (this.x <= 0 && this.y < 0) {
        this.reset();
        return;
      }

      const { special } = this.tiles.find(find => (find.x === this.x && find.y === this.y));

      if (special) {
        this.x = special.x;
        this.y = special.y;
      }

      this.deltaX = this.x - this.oldX;
      this.deltaY = this.y - this.oldY;
    }
  }

  roll(is = false) {
    this.autoRoll = is;
    this.rollInProgress = false;
    const { diceMin, diceMax } = Player;
    const diceThrow = round(random(diceMin, diceMax));
    this.goNFields(diceThrow);

    return diceThrow;
  }
}
