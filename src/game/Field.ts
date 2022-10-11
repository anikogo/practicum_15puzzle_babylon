export default class Field {
  width: number;

  ctx: CanvasRenderingContext2D;

  #fillColor: CanvasFillStrokeStyles['fillStyle'];

  constructor(
    width: number,
    fillColor: CanvasFillStrokeStyles['fillStyle'],
    ctx: CanvasRenderingContext2D,
  ) {
    this.width = width;
    this.ctx = ctx;
    this.#fillColor = fillColor;
  }

  draw() {
    this.ctx.fillStyle = this.#fillColor;
    this.ctx.fillRect(0, 0, this.width, this.width);
  }
}
