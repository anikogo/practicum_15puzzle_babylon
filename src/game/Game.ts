import Field from './Field';
import { populateArray, shuffleArray } from '../utils';
import Tile from './Tile';
import Stats from './Stats';

type GameOptions = {
  boardSize: number;
  fieldFillColors: string | string[];
  tileFillColors: string | string[];
  onPuzzleSolved: (score: number) => void;
};

export default class Game {
  boardSize: number;

  tileWidth: number;

  #state: string;

  tiles: Tile[];

  canvas?: HTMLCanvasElement;

  ctx?: CanvasRenderingContext2D | null;

  numbers: number[];

  #fieldFill: string | CanvasGradient;

  #tileFill: string | CanvasGradient;

  #field?: Field;

  #stats: Stats;

  #isAnimate: boolean;

  onPuzzleSolved: (score: number) => void;

  constructor() {
    this.boardSize = 4;
    this.#fieldFill = '';
    this.#tileFill = '';
    this.tiles = [];
    this.numbers = [];
    this.tileWidth = 0;
    this.#state = 'stopped';
    this.#isAnimate = false;
    this.onPuzzleSolved = () => {};
    this.#stats = new Stats();
  }

  isSolvable() {
    let parity = 0;
    let row = 0;
    let blankRow = 0;
    for (let i = 0; i < this.numbers.length; i++) {
      if (i % this.boardSize === 0) {
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

    if (this.boardSize % 2 === 0) {
      if (blankRow % 2 === 0) {
        return parity % 2 === 0;
      }
      return parity % 2 !== 0;
    }
    return parity % 2 === 0;
  }

  generateNumbers() {
    this.numbers = shuffleArray(populateArray((this.boardSize * this.boardSize) - 1));

    if (!this.isSolvable()) {
      this.generateNumbers();
    } else {
      this.numbers.push(0);
    }
  }

  getTilePos = (content: number) => {
    const zeroIndex = this.numbers.indexOf(content);
    const zeroCol = Math.floor(zeroIndex % this.boardSize);
    const zeroRow = Math.floor(zeroIndex / this.boardSize);
    return [zeroCol, zeroRow, zeroIndex];
  };

  spawnTiles() {
    if (this.ctx) {
      for (let i = 0; i < this.numbers.length; i++) {
        const [col, row] = this.getTilePos(this.numbers[i]);

        this.tiles.push(new Tile(this.ctx, {
          x: col * this.tileWidth,
          y: row * this.tileWidth,
          size: this.tileWidth,
          content: this.numbers[i],
          fill: this.#tileFill,
          padding: 4,
        }));
      }

      this.tiles.forEach((tile) => tile.draw());
    }
  }

  init(canvas: HTMLCanvasElement, {
    boardSize,
    fieldFillColors,
    tileFillColors,
    onPuzzleSolved,
  }: GameOptions) {
    this.boardSize = boardSize;
    this.onPuzzleSolved = onPuzzleSolved;
    if (this.state === 'stopped') {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.numbers = populateArray((this.boardSize * this.boardSize) - 1);
      this.numbers.push(0);

      if (this.ctx) {
        this.tileWidth = this.canvas.height / this.boardSize || 0;
        if (typeof tileFillColors !== 'string') {
          this.#tileFill = this.ctx.createLinearGradient(0, 0, this.canvas.width, 0);
          for (let i = 0; i < tileFillColors.length; i++) {
            this.#tileFill.addColorStop(i / tileFillColors.length, tileFillColors[i]);
          }
        } else {
          this.#tileFill = tileFillColors;
        }

        if (typeof fieldFillColors !== 'string') {
          this.#fieldFill = this.ctx.createLinearGradient(0, 0, this.ctx.canvas.width, 0);
          for (let i = 0; i < fieldFillColors.length; i++) {
            this.#fieldFill
              .addColorStop(i / fieldFillColors.length, fieldFillColors[i]);
          }
        } else {
          this.#fieldFill = fieldFillColors;
        }

        this.#field = new Field(this.tileWidth * this.boardSize, this.#fieldFill, this.ctx);
        this.#field.draw();
        this.spawnTiles();
      }
    }
  }

  start() {
    if (this.state !== 'started') {
      this.tiles = [];
      this.generateNumbers();
      this.spawnTiles();
      this.#stats.movesCount = 0;
      this.#stats.time = 0;
      this.#state = 'started';
      document.addEventListener('keydown', this.onArrowKeyPress.bind(this));
      this.canvas?.addEventListener('click', this.handleClick.bind(this));
    }
  }

  stop() {
    console.log('stop');
    this.numbers = populateArray((this.boardSize * this.boardSize) - 1);
    this.numbers.push(0);

    this.spawnTiles();
    this.#stats?.stopTimer();
    this.#state = 'stopped';

    document.removeEventListener('keydown', this.onArrowKeyPress.bind(this));
    this.canvas?.removeEventListener('click', this.handleClick.bind(this));
  }

  destroy() {
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
      const canMove = (code === 'ArrowRight' && col < this.boardSize - 1)
        || (code === 'ArrowLeft' && col > 0)
        || (code === 'ArrowDown' && row < this.boardSize - 1)
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
        tileToMove = this.tiles[zeroIdx - this.boardSize];
        break;
      case 'ArrowUp':
        tileToMove = this.tiles[zeroIdx + this.boardSize];
        break;
      default:
        break;
    }

    if (tileToMove) {
      this.moveTile(tileToMove, code);
    }
  }

  calcScore() {
    if (this.#stats) {
      const { movesCount, time } = this.#stats;
      return Math.round((time / movesCount) * 100);
    }
    return 0;
  }

  winAnimation() {
    while (this.tiles.length) {
      const tile = this.tiles[Math.floor(Math.random() * this.tiles.length)];
      if (tile) {
        tile.move(tile.x + Math.random() * 100 - 50, tile.y + Math.random() * 100 - 50);
        if (tile.x > this.ctx!.canvas.width || (tile.x + tile.size + tile.padding * 2) < 0
          || tile.y > this.ctx!.canvas.height || (tile.y + tile.size + tile.padding * 2) < 0) {
          this.tiles.splice(this.tiles.indexOf(tile), 1);
        }
      }
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
    const score = this.calcScore();
    // this.winAnimation();
    this.onPuzzleSolved(score);
    this.stop();
  }

  get state() {
    return this.#state;
  }
}
