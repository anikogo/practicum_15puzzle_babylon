export default class Field {
  width: number;

  color: string;

  ctx: CanvasRenderingContext2D;

  constructor(boardSize: number, ctx: CanvasRenderingContext2D) {
    this.width = Math.floor(globalThis.innerHeight / 8) * boardSize;
    this.color = 'lightgreen';
    this.ctx = ctx;
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(0, 0, this.width, this.width);
  }
}
