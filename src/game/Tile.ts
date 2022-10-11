export default class Tile {
  x: number;

  y: number;

  private readonly size: number;

  readonly content: number | string;

  private ctx: CanvasRenderingContext2D;

  private fontSize: number;

  private fill: CanvasFillStrokeStyles['fillStyle'];

  private radius: number;

  constructor(
    x: number,
    y: number,
    size: number,
    content: number | string,
    fill: CanvasFillStrokeStyles['fillStyle'],
    ctx: CanvasRenderingContext2D,
  ) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.radius = 15;
    this.fontSize = this.size / 3;
    this.content = content;
    this.ctx = ctx;
    this.fill = fill;
  }

  public draw() {
    this.ctx.clearRect(this.x, this.y, this.size, this.size);
    if (this.content !== 0) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.x + this.radius, this.y);
      this.ctx.lineTo(this.x + this.size - this.radius, this.y);
      this.ctx.quadraticCurveTo(
        this.x + this.size,
        this.y,
        this.x + this.size,
        this.y + this.radius,
      );
      this.ctx.lineTo(this.x + this.size, this.y + this.size - this.radius);
      this.ctx.quadraticCurveTo(
        this.x + this.size,
        this.y + this.size,
        this.x + this.size - this.radius,
        this.y + this.size,
      );
      this.ctx.lineTo(this.x + this.radius, this.y + this.size);
      this.ctx.quadraticCurveTo(
        this.x,
        this.y + this.size,
        this.x,
        this.y + this.size - this.radius,
      );
      this.ctx.lineTo(this.x, this.y + this.radius);
      this.ctx.quadraticCurveTo(this.x, this.y, this.x + this.radius, this.y);
      this.ctx.closePath();
      this.ctx.fillStyle = this.fill;
      this.ctx.fill();
      this.ctx.strokeStyle = '#374251';
      this.ctx.lineWidth = 8;
      this.ctx.stroke();
      this.ctx.fillStyle = 'white';
      this.ctx.font = `${this.fontSize}px sans-serif`;
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(`${this.content}`, this.x + this.size / 2, this.y + this.size / 2);
    }
  }

  public move(x: number, y: number) {
    return new Promise((resolve) => {
      const xDiff = x - this.x;
      const yDiff = y - this.y;
      const xStep = xDiff / 5;
      const yStep = yDiff / 5;

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
