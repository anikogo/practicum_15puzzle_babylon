import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Game from '../game/Game';
import Content from '../components/Content';
import withUser from '../hoc/withUser';
import { useAddUserMutation } from '../store';

function IndexPage({ user }: { user?: User }) {
  const [boardSize] = useState(4);
  const [postScore] = useAddUserMutation();
  const game = useMemo(() => new Game({
    boardSize,
    onPuzzleSolved: (score) => {
      postScore({
        data: {
          ...user,
          score,
        },
        teamName: 'babylon',
        ratingFieldName: 'score',
      });
    },
  }), [boardSize]);

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
      <canvas
        ref={ref}
        width={fieldSize + 250}
        height={fieldSize}
        className="m-auto p-6 rounded-2xl bg-emerald-800"
      />
    </Content>
  );
}

export default withUser(IndexPage);
