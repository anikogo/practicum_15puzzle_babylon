import { useEffect, useRef } from 'react';
import Field from '../api/Field';
import shuffle from '../api/shuffleArray';
import filedSize15 from '../api/dimensions';
import Content from '../components/Content';

export default function IndexPage() {
  const sideSize: number = filedSize15.sideSize as number;

  const numbers: number[] = shuffle(filedSize15.arr as number[]);

  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx: CanvasRenderingContext2D = ref.current?.getContext('2d') as CanvasRenderingContext2D;
    if (!ctx) throw new Error('Error');

    const rect: DOMRect = ref.current?.getBoundingClientRect() as DOMRect;

    const field = new Field(sideSize, ctx, numbers);
    field.spawnTiles();

    document.addEventListener('keyup', (e: KeyboardEvent) => { field.keyboardMovie(e); });

    ref.current?.addEventListener('click', (e: MouseEvent) => { field.handleClick(e, rect); });
  }, [numbers, sideSize]);

  return (
    <Content heading="Game">
      <canvas ref={ref} width={sideSize} height={sideSize} className="mt-6" />
    </Content>
  );
}
