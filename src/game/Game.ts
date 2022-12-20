import Field from './Field';
import { populateArray, shuffleArray } from '../utils';
import Tile from './Tile';
import Stats from './Stats';
import playSound from '../utils/playSound';

type GameOptions = {
  boardSize: number;
  fieldFillColors: string | string[];
  tileFillColors: string | string[];
  onPuzzleSolved: (score: number) => void;
};

type GameOptions = {
  boardSize: number;
  fieldFillColors: string | string[];
  tileFillColors: string | string[];
  image?: HTMLImageElement;
  onPuzzleSolved: (score: number) => void;
};

type DrawImageParams = [
  HTMLImageElement,
  number, number, number, number, number, number, number, number,
];

/**
 * gets start and end coordinates, width and height of the cropped image
 * @param {HTMLImageElement} image - The image to crop
 * @returns {[number, number, number, number]} - The start and end coordinates,
 *  width and height of the cropped image
 */
function getResizedDimensions(image: HTMLImageElement): [number, number, number, number] {
  const { width, height } = image;
  const ratio = width / height;
  if (ratio > 1) {
    const horizontalOffset = (width - height) / 2;
    return [horizontalOffset, 0, height, height];
  }
  const verticalOffset = (height - width) / 2;
  return [0, verticalOffset, width, width];
}

/**
 * Game class, handles the game logic
 * @class
 */
export default class Game {
  boardSize: number;

  tileWidth: number;

  #state: string;

  tiles: Tile[];

  canvas?: HTMLCanvasElement;

  ctx?: CanvasRenderingContext2D | null;

  numbers: number[];

  successPattern: number[];

  #fieldFill: string | CanvasGradient;

  #tileFill: string | CanvasGradient;

  #imageLoaded = false;

  #slices: ImageData[];

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
    this.#slices = [];
    this.successPattern = [];
    this.tileWidth = 0;
    this.#state = 'stopped';
    this.#isAnimate = false;
    this.onPuzzleSolved = () => {};
    this.#stats = new Stats();
  }

  /**
   * Checks if the puzzle is solvable
   * @returns {boolean}
   */
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

  /**
   * Generates a random array of numbers
   */
  generateNumbers() {
    this.numbers = shuffleArray(populateArray((this.boardSize * this.boardSize) - 1));

    if (!this.isSolvable()) {
      this.generateNumbers();
    } else {
      this.numbers.push(0);
    }
  }

  /**
   * Gets the tile position by its number
   * @param {number} content - The tile number
   * @returns {[number, number, number]} - The tile position
   */
  getTilePos = (content: number) => {
    const zeroIndex = this.numbers.indexOf(content);
    const zeroCol = Math.floor(zeroIndex % this.boardSize);
    const zeroRow = Math.floor(zeroIndex / this.boardSize);
    return [zeroCol, zeroRow, zeroIndex];
  };

  /**
   * Spawns tiles on the field
   */
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
          imageData: this.#imageLoaded ? this.#slices[this.numbers[i] - 1] : undefined,
          padding: this.#imageLoaded ? 0 : 4,
        }));
      }

      this.tiles.forEach((tile) => tile.draw());
    }
  }

  /**
   * Gets the parameters for the drawImage method
   * @param {HTMLImageElement} image - The image to crop
   * @returns {DrawImageParams} - The parameters for the drawImage method
   */
  getDrawImageParams(image: HTMLImageElement): DrawImageParams {
    if (this.canvas) {
      const [sx, sy, sw, sh] = getResizedDimensions(image);
      const [dx, dy, dw, dh] = [
        0, 0,
        this.canvas.width, this.canvas.height,
      ];
      return [image, sx, sy, sw, sh, dx, dy, dw, dh];
    }
    return [image, 0, 0, 0, 0, 0, 0, 0, 0];
  }

  /**
   * Initializes the game
   * @param {HTMLCanvasElement} canvas - The canvas element
   * @param {GameOptions} options - The game options
   * @param {number} options.boardSize - The board size
   * @param {string | string[]} options.fieldFillColors - The field fill colors
   * @param {string | string[]} options.tileFillColors - The tile fill colors
   * @param {HTMLImageElement} options.image - The image to use
   * @param {boolean} options.onPuzzleSolved - The callback function to call
   *  when the puzzle is solved
   */
  init(canvas: HTMLCanvasElement, {
    boardSize,
    fieldFillColors,
    tileFillColors,
    image,
    onPuzzleSolved,
  }: GameOptions) {
    this.boardSize = boardSize;
    this.onPuzzleSolved = onPuzzleSolved;
    if (this.state === 'stopped') {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      if (image) {
        this.#imageLoaded = true;
        this.ctx?.drawImage(...this.getDrawImageParams(image));
      } else {
        this.#imageLoaded = false;
        this.#slices = [];
      }
      this.numbers = populateArray((this.boardSize * this.boardSize) - 1);
      this.successPattern = [...this.numbers];
      this.numbers.push(0);

      if (this.ctx) {
        this.tileWidth = this.canvas.height / this.boardSize || 0;
        this.#slices = [];
        if (this.#imageLoaded) {
          for (let i = 0; i < this.numbers.length; i++) {
            const col = i % this.boardSize;
            const row = Math.floor(i / this.boardSize);
            const slice = this.ctx.getImageData(
              col * this.tileWidth,
              row * this.tileWidth,
              this.tileWidth,
              this.tileWidth,
            );
            this.#slices.push(slice);
          }
        }

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
        // this.#field.draw();
        this.spawnTiles();
      }
    }
  }

  /**
   * Starts the game
   */
  start() {
    if (this.state !== 'started') {
      this.tiles = [];
      this.generateNumbers();
      this.spawnTiles();
      this.#stats.movesCount = 0;
      this.#stats.time = 0;
      this.#state = 'started';
      document.addEventListener('keydown', this.onArrowKeyPress);
      this.canvas?.addEventListener('click', this.handleClick);
    }
  }

  /**
   * Stops the game
   */
  stop() {
    this.numbers = populateArray((this.boardSize * this.boardSize) - 1);
    this.successPattern = [...this.numbers];
    this.numbers.push(0);

    this.spawnTiles();
    this.#stats?.stopTimer();
    this.#state = 'stopped';

    document.removeEventListener('keydown', this.onArrowKeyPress);
    this.canvas?.removeEventListener('click', this.handleClick);
  }

  /**
   * Resets the game
   */
  destroy() {
    if (this.#field) {
      document.removeEventListener('keydown', this.onArrowKeyPress);
      this.canvas?.removeEventListener('click', this.handleClick);
    }
  }

  /**
   * Moves the tile to the empty space
   * @param {Tile} tile - The tile to move
   * @param {string} code - The key code
   */
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

        if (localStorage.getItem('sound') === 'on') {
          playSound();
        }
      }
    }
  }

  /**
   * Gets the mouse position
   * @param {number} x - The x coordinate
   * @param {number} y - The y coordinate
   * @returns {number[]} - The tile position
   */
  getCursorPosition(x: number, y: number) {
    if (this.canvas) {
      const rect = this.canvas?.getBoundingClientRect();
      return [x - rect.left, y - rect.top];
    }
    return [x, y];
  }

  /**
   * Tile click handler
   * @param {number} x - The x coordinate
   * @param {number} y - The y coordinate
   */
  handleClick = ({ x, y }: MouseEvent) => {
    const [cursorX, cursorY] = this.getCursorPosition(x, y);
    const tileToMove = this.tiles.find((tile) => tile.isMouseOver(cursorX, cursorY));
    if (tileToMove) {
      this.moveTile(tileToMove, '');
    }
  };

  /**
   * Arrow key press handler
   * @param {KeyboardEvent} e - The event
   * @param {string} e.code - The key code
   */
  onArrowKeyPress = ({ code }: KeyboardEvent) => {
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
  };

  /**
   * Calculates the game score
   * @returns {number} - The score
   */
  calcScore() {
    if (this.#stats) {
      const { movesCount, time } = this.#stats;
      return Math.round((1 / Math.sqrt(time) + 2 / (movesCount ** 2)) * 1000 * this.boardSize);
    }
    return 0;
  }

  /**
   * Checks if the game is won
   * Compares the current numbers array with the success pattern
   * Calls the victory callback if the game is won
   * @returns {boolean} - The result
   */
  isVictory() {
    let result = true;
    this.successPattern.forEach((el, i) => {
      if (el !== this.tiles[i].content) {
        result = false;
      }
    });

    if (result) {
      this.#stats?.stopTimer();
      const score = this.calcScore();
      this.onPuzzleSolved(score);
      this.stop();
    }
  }

  /**
   * Game state getter
   * @returns {string}
   */
  get state() {
    return this.#state;
  }
}
