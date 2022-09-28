import Field from './Field';
import { populateArray, shuffleArray } from '../utils';
import Tile from './Tile';
import Stats from './Stats';

export default class Game {
  sideSize: number;

  tileWidth: number;

  state: string;

  tiles: Tile[];

  canvas?: HTMLCanvasElement;

  ctx?: CanvasRenderingContext2D | null;

  numbers: number[];

  #field?: Field;

  #stats?: Stats;

  #isAnimate: boolean;

  constructor(sideSize: number) {
    this.sideSize = sideSize;
    this.tiles = [];
    this.numbers = [];
    this.tileWidth = Math.floor(globalThis.innerHeight / 8);
    this.state = 'stopped';
    this.#isAnimate = false;
  }

  isSolvable() {
    let parity = 0;
    let row = 0;
    let blankRow = 0;
    for (let i = 0; i < this.numbers.length; i++) {
      if (i % this.sideSize === 0) {
        row++;
      }
      if (this.numbers[i] === 0) {
        blankRow = row;
        // eslint-disable-next-line no-continue
        continue;
      }
      for (let j = i + 1; j < this.numbers.length; j++) {
        if (this.numbers[i] > this.numbers[j] && this.numbers[j] !== 0) {
          parity++;
        }
      }
    }

    if (this.sideSize % 2 === 0) {
      if (blankRow % 2 === 0) {
        return parity % 2 === 0;
      }
      return parity % 2 !== 0;
    }
    return parity % 2 === 0;
  }

  generateNumbers() {
    this.numbers = shuffleArray(populateArray(this.sideSize * this.sideSize));

    if (!this.isSolvable()) {
      this.generateNumbers();
    }
  }

  getTilePos = (content: number) => {
    const zeroIndex = this.numbers.indexOf(content);
    const zeroCol = Math.floor(zeroIndex % 4);
    const zeroRow = Math.floor(zeroIndex / 4);
    return [zeroCol, zeroRow, zeroIndex];
  };

  spawnTiles() {
    if (this.ctx) {
      for (let i = 0; i < this.numbers.length; i++) {
        const [col, row] = this.getTilePos(this.numbers[i]);

        this.tiles.push(new Tile(
          col * this.tileWidth,
          row * this.tileWidth,
          this.tileWidth,
          this.numbers[i],
          this.ctx,
        ));
      }

      this.tiles.forEach((tile) => tile.draw());
    }
  }

  init(canvas: HTMLCanvasElement) {
    if (this.state === 'stopped') {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');

      if (this.ctx) {
        this.#field = new Field(this.sideSize, this.ctx);
        this.#field.draw();
        this.#stats = new Stats(this.ctx, this.#field.width + 30, 40);
        this.#stats.draw();

        document.addEventListener('keydown', this.onArrowKeyPress.bind(this));
        this.canvas.addEventListener('click', this.handleClick.bind(this));
      }
    }
  }

  start() {
    if (this.state !== 'started') {
      this.generateNumbers();
      this.spawnTiles();
      this.state = 'started';
    }
  }

  stop() {
    if (this.#field) {
      document.removeEventListener('keydown', this.onArrowKeyPress.bind(this));
      this.canvas?.removeEventListener('click', this.handleClick.bind(this));
    }
  }

  moveTile(tile: Tile, code?: string) {
    if (!this.#isAnimate) {
      const [zeroCol, zeroRow, zeroIdx] = this.getTilePos(0);
      const zeroTile = this.tiles[zeroIdx];
      const [col, row, ttmIdx] = this.getTilePos(+tile.content);
      const canMove = (code === 'ArrowRight' && col < this.sideSize - 1)
        || (code === 'ArrowLeft' && col > 0)
        || (code === 'ArrowDown' && row < this.sideSize - 1)
        || (code === 'ArrowUp' && row > 0)
        || (!code && (Math.abs(zeroCol - col) + Math.abs(zeroRow - row)) === 1);

      if (canMove) {
        [this.tiles[zeroIdx], this.tiles[ttmIdx]] = [this.tiles[ttmIdx], this.tiles[zeroIdx]];
        this.numbers = this.tiles.map((t) => +t.content);
        const newZeroX = tile.x;
        const newZeroY = tile.y;
        const newTileX = zeroTile.x;
        const newTileY = zeroTile.y;
        this.#isAnimate = true;
        tile.move(newTileX, newTileY)
          .then(() => {
            if (this.#stats) {
              if (this.#stats.state === 'stopped') {
                this.#stats.startTimer();
              }
              this.#stats.movesCount++;
            }
            zeroTile.x = newZeroX;
            zeroTile.y = newZeroY;
            zeroTile.draw();
            this.#isAnimate = false;
            this.isVictory();
          });
      }
    }
  }

  getCursorPosition(x: number, y: number) {
    if (this.canvas) {
      const rect = this.canvas?.getBoundingClientRect();
      return [x - rect.left, y - rect.top];
    }
    return [x, y];
  }

  handleClick({ x, y }: MouseEvent) {
    const [cursorX, cursorY] = this.getCursorPosition(x, y);
    const tileToMove = this.tiles.find((tile) => tile.isMouseOver(cursorX, cursorY));
    if (tileToMove) {
      this.moveTile(tileToMove, '');
    }
  }

  onArrowKeyPress({ code }: KeyboardEvent) {
    const [, , zeroIdx] = this.getTilePos(0);
    let tileToMove: Tile | undefined;
    switch (code) {
      case 'ArrowRight':
        tileToMove = this.tiles[zeroIdx - 1];
        break;
      case 'ArrowLeft':
        tileToMove = this.tiles[zeroIdx + 1];
        break;
      case 'ArrowDown':
        tileToMove = this.tiles[zeroIdx - this.sideSize];
        break;
      case 'ArrowUp':
        tileToMove = this.tiles[zeroIdx + this.sideSize];
        break;
      default:
        break;
    }

    if (tileToMove) {
      this.moveTile(tileToMove, code);
    }
  }

  isVictory() {
    const etalon: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];

    // eslint-disable-next-line no-restricted-syntax, prefer-const
    for (let i in etalon) {
      if (etalon[i] !== this.tiles[i].content) {
        return;
      }
    }

    // eslint-disable-next-line no-alert
    this.#stats?.stopTimer();
    alert('Eeeah');
  }
}
