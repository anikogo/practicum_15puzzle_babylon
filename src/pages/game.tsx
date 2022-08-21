import { useEffect, useRef } from 'react';
import Field from '../api/Field';
import shuffle from '../api/shuffleArray';
import filedSize15 from '../api/dimensions';
import Content from '../components/Content';

export default function GamePage() {
  const sideSize: number = filedSize15.sideSize as number;

  const numbers: number[] = shuffle(filedSize15.arr as number[]);

  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx: CanvasRenderingContext2D = ref.current?.getContext('2d') as CanvasRenderingContext2D;
    if (!ctx) throw new Error('Error');

    const rect: DOMRect = ref.current?.getBoundingClientRect() as DOMRect;

    const field = new Field(sideSize, 'lightgreen', ctx, [], numbers);
    field.spawnTiles();

    const handleClick = (e: MouseEvent) => {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const idx = field.getTileIndex(x, y);

      if (field.tiles[idx - 1]) {
        if (field.tiles[idx - 1].num === 0 && idx !== 0 && idx !== 4 && idx !== 8 && idx !== 12) {
          field.updateTile(idx, 'left');
          return;
        }
      }

      if (field.tiles[idx + 1]) {
        if (field.tiles[idx + 1].num === 0 && idx !== 3 && idx !== 7 && idx !== 11 && idx !== 15) {
          field.updateTile(idx, 'right');
          return;
        }
      }

      if (field.tiles[idx - 4]) {
        if (field.tiles[idx - 4].num === 0 && idx !== 0 && idx !== 1 && idx !== 2 && idx !== 3) {
          field.updateTile(idx, 'top');
          return;
        }
      }

      if (field.tiles[idx + 4]) {
        // eslint-disable-next-line max-len
        if (field.tiles[idx + 4].num === 0 && idx !== 12 && idx !== 13 && idx !== 14 && idx !== 15) {
          field.updateTile(idx, 'bottom');
        }
      }
    };

    ref.current?.addEventListener('click', handleClick);

    const keyboardMovie = (e: KeyboardEvent): void => {
      const idx = field.tiles.findIndex((elem) => elem.num === 0);

      if (e.code === 'ArrowRight' && idx !== 0 && idx !== 4 && idx !== 8 && idx !== 12) {
        field.updateTile(idx - 1, 'right');
      }
      if (e.code === 'ArrowLeft' && idx !== 3 && idx !== 7 && idx !== 11 && idx !== 15) {
        field.updateTile(idx + 1, 'left');
      }
      if (e.code === 'ArrowDown' && idx !== 0 && idx !== 1 && idx !== 2 && idx !== 3) {
        field.updateTile(idx - 4, 'bottom');
      }
      if (e.code === 'ArrowUp' && idx !== 12 && idx !== 13 && idx !== 14 && idx !== 15) {
        field.updateTile(idx + 4, 'top');
      }
    };

    document.addEventListener('keyup', keyboardMovie);
  }, [numbers, sideSize]);

  return (
    <Content heading="Game">
      <canvas ref={ref} width={sideSize} height={sideSize} />
    </Content>
  );
}
