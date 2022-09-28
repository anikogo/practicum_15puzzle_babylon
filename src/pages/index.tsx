import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Game from '../game/Game';
import Content from '../components/Content';
import withUser from '../hoc/withUser';

function IndexPage() {
  const [boardSize] = useState(4);
  const game = useMemo(() => new Game(boardSize), [boardSize]);

  const ref = useRef<HTMLCanvasElement>(null);

  const fieldSize = Math.floor(globalThis.innerHeight / 8) * boardSize;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) throw new Error('Error');

    game.init(canvas);
    game.start();

    return () => {
      game.stop();
    };
  }, [game, boardSize]);

  return (
    <Content heading="Game" className="flex w-full h-[calc(100vh_-_128px)]">
      <canvas ref={ref} width={fieldSize} height={fieldSize} className="m-auto" />
    </Content>
  );
}

export default withUser(IndexPage);
