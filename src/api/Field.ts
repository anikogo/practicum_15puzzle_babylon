export default class Field {
  size: number;

  color: string;

  ctx: CanvasRenderingContext2D;

  tiles: Record<string, number>[];

  numbers: number[];

  constructor(
    fieldSize: number,
    ctx: CanvasRenderingContext2D,
    numbers: number[],
  ) {
    this.size = fieldSize;
    this.color = 'lightgreen';
    this.ctx = ctx;
    this.tiles = [];
    this.numbers = numbers;
  }

  drawField() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(0, 0, this.size, this.size);
  }

  drawTile(x: number, y: number, num: number) {
    const size: number = this.size / 4;
    const fontSize: number = size / 3;

    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    if (num !== 0) {
      this.ctx.fillStyle = 'lightyellow';
      this.ctx.fillRect(x, y, size, size);
      this.ctx.fillStyle = 'green';
      this.ctx.strokeStyle = 'green';
      this.ctx.strokeRect(x, y, size, size);
      this.ctx.font = `${fontSize}px sans-serif`;
      this.ctx.fillText(`${num}`, x + size / 2, y + size / 2);
    }
    const tile: Record<string, number> = {
      num,
      size,
      x,
      y,
    };

    return tile;
  }

  spawnTiles() {
    let x = 0;
    let y = 0;

    const tileSize: number = this.size / 4;

    this.drawField();
    this.tiles = [];

    for (let i = 0; i < this.numbers.length; i++) {
      if (i < 4 && i > 0) x += tileSize;

      if (i >= 4 && i < 8) {
        if (i === 4) x = 0;
        if (i > 4) x += tileSize;
        y = tileSize;
      }

      if (i >= 8 && i < 12) {
        if (i === 8) x = 0;
        if (i > 8) x += tileSize;
        y = tileSize * 2;
      }

      if (i >= 12 && i < 16) {
        if (i === 12) x = 0;
        if (i > 12) x += tileSize;
        y = tileSize * 3;
      }

      this.tiles.push(this.drawTile(x, y, this.numbers[i]));
    }

    this.tiles.forEach((tile) => this.drawTile(tile.x, tile.y, tile.num));
  }

  updateTile(idx: number, side: string) {
    const posX: number = this.tiles[idx].x;
    const posY: number = this.tiles[idx].y;
    const stopPos: number = this.size / 4;

    const animate = (): void => {
      if (side === 'left' && (posX - this.tiles[idx].x) === stopPos) {
        [this.tiles[idx - 1], this.tiles[idx]] = [this.tiles[idx], this.tiles[idx - 1]];
        this.isVictory();
        return;
      }
      if (side === 'right' && (this.tiles[idx].x - posX) === stopPos) {
        [this.tiles[idx + 1], this.tiles[idx]] = [this.tiles[idx], this.tiles[idx + 1]];
        this.isVictory();
        return;
      }
      if (side === 'top' && (posY - this.tiles[idx].y) === stopPos) {
        [this.tiles[idx - 4], this.tiles[idx]] = [this.tiles[idx], this.tiles[idx - 4]];
        this.isVictory();
        return;
      }
      if (side === 'bottom' && (this.tiles[idx].y - posY) === stopPos) {
        [this.tiles[idx + 4], this.tiles[idx]] = [this.tiles[idx], this.tiles[idx + 4]];
        this.isVictory();
        return;
      }

      requestAnimationFrame(animate);
      this.drawField();
      if (side === 'left') this.tiles[idx].x -= this.size / 32;
      if (side === 'right') this.tiles[idx].x += this.size / 32;
      if (side === 'top') this.tiles[idx].y -= this.size / 32;
      if (side === 'bottom') this.tiles[idx].y += this.size / 32;

      this.tiles.forEach((tile) => this.drawTile(tile.x, tile.y, tile.num));
    };

    animate();
  }

  isVictory() {
    const etalon: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];

    // eslint-disable-next-line no-restricted-syntax, prefer-const
    for (let i in etalon) {
      if (etalon[i] !== this.tiles[i].num) {
        return;
      }
    }

    // eslint-disable-next-line no-alert
    alert('Eeeah');
  }

  getTileIndex(x: number, y: number) {
    const xpos: number = 4 - Math.floor((this.size - x) / (this.size / 4));
    const ypos: number = 4 - Math.floor((this.size - y) / (this.size / 4));

    return (ypos - 1) * 4 + xpos - 1;
  }

  handleClick(e: MouseEvent, rect: DOMRect) {
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const idx = this.getTileIndex(x, y);

    if (this.tiles[idx - 1]) {
      if (this.tiles[idx - 1].num === 0 && idx !== 0 && idx !== 4 && idx !== 8 && idx !== 12) {
        this.updateTile(idx, 'left');
        return;
      }
    }

    if (this.tiles[idx + 1]) {
      if (this.tiles[idx + 1].num === 0 && idx !== 3 && idx !== 7 && idx !== 11 && idx !== 15) {
        this.updateTile(idx, 'right');
        return;
      }
    }

    if (this.tiles[idx - 4]) {
      if (this.tiles[idx - 4].num === 0 && idx > 3) {
        this.updateTile(idx, 'top');
        return;
      }
    }

    if (this.tiles[idx + 4]) {
      // eslint-disable-next-line max-len
      if (this.tiles[idx + 4].num === 0 && idx < 12) {
        this.updateTile(idx, 'bottom');
      }
    }
  }

  keyboardMovie(e: KeyboardEvent) {
    const idx = this.tiles.findIndex((elem) => elem.num === 0);

    if (e.code === 'ArrowRight' && idx !== 0 && idx !== 4 && idx !== 8 && idx !== 12) {
      this.updateTile(idx - 1, 'right');
    }
    if (e.code === 'ArrowLeft' && idx !== 3 && idx !== 7 && idx !== 11 && idx !== 15) {
      this.updateTile(idx + 1, 'left');
    }
    if (e.code === 'ArrowDown' && idx > 3) {
      this.updateTile(idx - 4, 'bottom');
    }
    if (e.code === 'ArrowUp' && idx < 12) {
      this.updateTile(idx + 4, 'top');
    }
  }
}
