import "./main.sass";
import Tile from "./Tile";
import Player from "./Player";
import SnakesAndLaddersManager from "./SnakesAndLaddersManager";
import opts from "./options";

let tiles;
let players;
let snakesAndLadders;
let activePlayer = 0;

function setup() {
  const canvas = createCanvas(930, 930);
  canvas.parent("#app");

  const options = opts(width);

  Object.keys(options).forEach((key) => {
    Tile[key] = options[key];
    Player[key] = options[key];
    SnakesAndLaddersManager[key] = options[key];
  });

  tiles = Array.from(Array(options.cols * options.rows));
  tiles = tiles.map((_, i) => new Tile(i));

  snakesAndLadders = new SnakesAndLaddersManager(Tile, tiles);

  Player.autoRoll = false;
  players = Array.from(Array(options.playersNo));
  players = players.map(() => new Player(tiles));

  window.roll = (is = false) => {
    const diceThrow = players[activePlayer].roll(is);
    if (diceThrow !== options.diceMax) {
      activePlayer++;
      activePlayer %= players.length;
    }

    return `You have thrown ${diceThrow}`;
  };

  // const [player] = players;
  // window.player = player;
}

function draw() {
  tiles.forEach(tile => tile.draw());
  snakesAndLadders.draw();
  players.forEach(player => player.draw());
}


window.setup = setup;
window.draw = draw;
