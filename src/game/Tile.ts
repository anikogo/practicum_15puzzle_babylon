export default class Tile {
  x: number;

  y: number;

  private readonly size: number;

  readonly content: number | string;

  private ctx: CanvasRenderingContext2D;

  private fontSize: number;

  constructor(
    x: number,
    y: number,
    size: number,
    content: number | string,
    ctx: CanvasRenderingContext2D,
  ) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.fontSize = this.size / 3;
    this.content = content;
    this.ctx = ctx;
  }

  public draw() {
    this.ctx.fillStyle = 'lightgreen';
    this.ctx.fillRect(this.x, this.y, this.size, this.size);
    this.ctx.beginPath();
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.strokeStyle = 'lightgreen';
    if (this.content !== 0) {
      this.ctx.fillStyle = 'lightyellow';
      this.ctx.fillRect(this.x, this.y, this.size, this.size);
      this.ctx.font = `${this.fontSize}px sans-serif`;
      this.ctx.fillStyle = 'green';
      this.ctx.fillText(`${this.content}`, this.x + this.size / 2, this.y + this.size / 2);
    } else {
      this.ctx.fillStyle = 'lightgreen';
      this.ctx.fillRect(this.x, this.y, this.size, this.size);
    }
    this.ctx.strokeRect(this.x + 1, this.y + 1, this.size - 2, this.size - 2);
  }

  public move(x: number, y: number) {
    return new Promise((resolve) => {
      const xDiff = x - this.x;
      const yDiff = y - this.y;
      const xStep = xDiff / 10;
      const yStep = yDiff / 10;

      const animate = () => {
        const currentAbsDiffX = Math.abs(x - this.x);
        const currentAbsDiffY = Math.abs(y - this.y);
        if ((currentAbsDiffX > 0 && xDiff !== 0) || (currentAbsDiffY > 0 && yDiff !== 0)) {
          this.x += xStep;
          if (currentAbsDiffX < 1) {
            this.x = x;
          }
          this.y += yStep;
          if (currentAbsDiffY < 1) {
            this.y = y;
          }

          this.draw();
          requestAnimationFrame(animate);
        } else {
          resolve(true);
        }
      };

      animate();
    });
  }

  isMouseOver(x: number, y: number) {
    return (x >= this.x && x <= this.x + this.size && y >= this.y && y <= this.y + this.size);
  }
}
