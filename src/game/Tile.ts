type TileParams = {
  x: number;
  y: number;
  size: number;
  content: number | string;
  fill: CanvasFillStrokeStyles['fillStyle'];
  padding: number;
  imageData?: ImageData;
};

/**
 * Tile class, represents a single tile in the game
 * @class
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {TileParams} params - Tile params
 * @param {number} params.x - X position
 * @param {number} params.y - Y position
 * @param {number} params.size - Tile size
 * @param {number|string} params.content - Tile content
 * @param {number} params.fontSize - Font size
 * @param {string} params.fill - Fill color
 * @param {ImageData} params.imageData - Image data
 * @param {number} params.radius - Border radius
 * @param {number} params.padding - Padding
 */
export default class Tile {
  #ctx: CanvasRenderingContext2D;

  x: number;

  y: number;

  size: number;

  readonly content: number | string;

  #fontSize: number;

  #fill: CanvasFillStrokeStyles['fillStyle'];

  #imageData?: ImageData;

  #radius: number;

  padding: number;

  constructor(ctx: CanvasRenderingContext2D, {
    x,
    y,
    size,
    padding,
    content,
    fill,
    imageData,
  }: TileParams) {
    this.x = x + padding;
    this.y = y + padding;
    this.size = size - padding * 2;
    this.padding = padding;
    this.#radius = 15;
    this.#fontSize = this.size / 3;
    this.content = content;
    this.#ctx = ctx;
    this.#fill = fill;
    this.#imageData = imageData;
  }

  /**
   * Draw the tile
   */
  public draw() {
    // clear the tile
    this.#ctx.clearRect(
      this.x - this.padding,
      this.y - this.padding,
      this.size + this.padding * 2,
      this.size + this.padding * 2,
    );

    // draw the tile
    if (this.content !== 0) {
      this.#ctx.beginPath();
      this.#ctx.moveTo(this.x + this.#radius, this.y);
      this.#ctx.lineTo(this.x + this.size - this.#radius, this.y);
      this.#ctx.quadraticCurveTo(
        this.x + this.size,
        this.y,
        this.x + this.size,
        this.y + this.#radius,
      );
      this.#ctx.lineTo(this.x + this.size, this.y + this.size - this.#radius);
      this.#ctx.quadraticCurveTo(
        this.x + this.size,
        this.y + this.size,
        this.x + this.size - this.#radius,
        this.y + this.size,
      );
      this.#ctx.lineTo(this.x + this.#radius, this.y + this.size);
      this.#ctx.quadraticCurveTo(
        this.x,
        this.y + this.size,
        this.x,
        this.y + this.size - this.#radius,
      );
      this.#ctx.lineTo(this.x, this.y + this.#radius);
      this.#ctx.quadraticCurveTo(this.x, this.y, this.x + this.#radius, this.y);
      this.#ctx.closePath();

      // fill the tile
      if (!this.#imageData) {
        this.#ctx.fillStyle = this.#fill;
        this.#ctx.fill();
        this.#ctx.fillStyle = 'white';
        this.#ctx.font = `${this.#fontSize}px sans-serif`;
        this.#ctx.textAlign = 'center';
        this.#ctx.textBaseline = 'middle';
        this.#ctx.fillText(`${this.content}`, this.x + this.size / 2, this.y + this.size / 2);
      } else {
        this.#ctx.putImageData(this.#imageData, this.x, this.y, 0, 0, this.size, this.size);
      }
    }
  }

  /**
   * Move the tile to a new position
   * @param {number} x - The new x position
   * @param {number} y - The new y position
   * @returns {Promise<unknown>} - A promise that resolves when the animation is complete
   */
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

  /**
   * Check if the mouse is over the tile
   * @param {number} x - The x position of the mouse
   * @param {number} y - The y position of the mouse
   * @returns {boolean} - True if the mouse is over the tile
   */
  isMouseOver(x: number, y: number) {
    return (x >= this.x && x <= this.x + this.size && y >= this.y && y <= this.y + this.size);
  }
}
