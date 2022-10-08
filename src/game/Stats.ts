export default class Stats {
  #movesCount: number;

  #time: number;

  ctx: CanvasRenderingContext2D;

  x: number;

  y: number;

  #state: string;

  #timer: NodeJS.Timer | null;

  constructor(ctx: CanvasRenderingContext2D, x: number, y: number) {
    this.#movesCount = 0;
    this.#time = 0;
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.#state = 'stopped';
    this.#timer = null;
  }

  get state(): string {
    return this.#state;
  }

  get movesCount(): number {
    return this.#movesCount;
  }

  set movesCount(value: number) {
    this.#movesCount = value;
    this.draw();
  }

  get time(): number {
    return this.#time;
  }

  set time(value: number) {
    this.#time = value;
    this.draw();
  }

  startTimer() {
    this.#state = 'started';
    const start = Date.now();
    this.#timer = setInterval(() => {
      const delta = Date.now() - start;
      this.time = Math.floor(delta / 1000);
    }, 1000);
  }

  stopTimer() {
    this.#state = 'stopped';
    if (this.#timer) {
      clearInterval(this.#timer);
    }
  }

  formattedTime() {
    const minutes = Math.floor(this.time / 60);
    const seconds = this.time % 60;
    return `${(minutes < 10) ? `0${minutes}` : minutes}:${(seconds < 10) ? `0${seconds}` : seconds}`;
  }

  draw() {
    this.ctx.clearRect(this.x, this.y - 30, 200, 100);
    this.ctx.fillStyle = 'white';
    this.ctx.font = '30px Arial';
    this.ctx.textBaseline = 'middle';
    this.ctx.textAlign = 'left';
    this.ctx.fillText(`Moves: ${this.#movesCount}`, this.x, this.y);
    this.ctx.fillText(`Time: ${this.formattedTime()}`, this.x, this.y + 40);
  }
}
