export default class SnakesAndLaddersManager {
  constructor(Tile, tiles) {
    this.generatePoints();

    this.points.forEach(({ from, to }) => {
      const tile = Tile.getTileByXY(from.x, from.y, tiles);
      tile.special = to;
    });
  }

  isLadder(from, to) {
    return (from.y - to.y > 0 || from.x - to.x > 0);
  }

  generatePoints() {
    this.points = [];

    for (let i = 0; i < SnakesAndLaddersManager.laddersNo; i++) {
      const fromX = round(random(0, SnakesAndLaddersManager.cols - 1));
      const fromY = round(random(0, SnakesAndLaddersManager.rows - 1));

      const toX = round(random(0, SnakesAndLaddersManager.cols - 1));
      const toY = round(random(0, SnakesAndLaddersManager.rows - 1));

      if (fromX === toX && fromY === toY) {
        i--;
      } else {
        this.points.push(
          {
            from: {
              x: fromX,
              y: fromY,
            },
            to: {
              x: toX,
              y: toY,
            },
          },
        );
      }
    }
  }

  draw() {
    this.points.forEach(({ from, to }) => {
      const { size } = SnakesAndLaddersManager;
      strokeWeight(size * 0.2);

      if (this.isLadder(from, to)) {
        stroke(color(0, 200, 0));
      } else {
        stroke(color(200, 0, 0));
      }

      line(
        size * (from.x + 0.5),
        size * (from.y + 0.5),
        size * (to.x + 0.5),
        size * (to.y + 0.5),
      );
    });
  }
}
