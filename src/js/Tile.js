export default class Tile {
  static size = 20;
  static cols = 0;
  static rows = 0;

  static getTileByXY(findX, findY, tiles) {
    return tiles.find(({ x, y }) => (x === findX && y === findY));
  }

  constructor(index) {
    this.x = index % Tile.cols;
    this.y = Math.floor(index / Tile.cols);

    let colorOffset;

    if (this.y % 2 === 1) {
      colorOffset = index % 2;
    } else {
      colorOffset = (index + 1) % 2;
    }

    this.color = 20 + (colorOffset * 180);
  }

  draw() {
    noStroke();
    fill(this.color);
    const { x, y } = this;
    const { size } = Tile;
    rect(x * size, y * size, size, size);
  }
}
