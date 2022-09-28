export default class Field {
  width: number;

  color: string;

  ctx: CanvasRenderingContext2D;

  constructor(width: number, ctx: CanvasRenderingContext2D) {
    this.width = width;
    this.color = 'lightgreen';
    this.ctx = ctx;
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(0, 0, this.width, this.width);
  }
}
