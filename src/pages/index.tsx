import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Game from '../game/Game';
import Content from '../components/Content';
import withUser from '../hoc/withUser';
import { useAddUserMutation } from '../store';
import makeDataSelector from '../store/makeDataSelector';
import Button from '../components/Button';

const game = new Game();

const statsSelector = makeDataSelector('gameStats');

function formattedTime(time: number) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${(minutes < 10) ? `0${minutes}` : minutes}:${(seconds < 10) ? `0${seconds}` : seconds}`;
}

function IndexPage({ user }: { user?: User }) {
  const [boardSize] = useState(4);
  const [postScore] = useAddUserMutation();
  const { moves, time } = useSelector(statsSelector);

  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) throw new Error('Error');

    game.init(canvas, {
      boardSize,
      fieldFillColors: '#374251',
      tileFillColors: ['#22c55e', '#239354'],
      onPuzzleSolved: (score) => {
        postScore({
          data: {
            ...user,
            id: undefined,
            score,
          },
          teamName: 'babylon',
          ratingFieldName: 'score',
        });
      },
    });

    return () => game.stop();
  }, [game, boardSize]);

  return (
    <Content heading="Game" className="flex w-full h-[calc(100vh_-_128px)]">
      <div className="flex gap-5 m-auto p-6 w-[750px] h-[530px] rounded-2xl bg-[#374251]">
        <canvas
          ref={ref}
          width={480}
          height={480}
        />
        <div className="text-white text-3xl">
          <p className="my-3">
            Moves:&nbsp;
            {moves}
          </p>
          <p className="my-3">
            Time:&nbsp;
            {formattedTime(time)}
          </p>
          <Button
            variant="filled"
            color="green"
            as={Link}
            to="/"
            onClick={() => (game.state === 'stopped' ? game.start() : game.stop())}
          >
            {game.state === 'stopped' ? 'Start' : 'Stop'}
          </Button>
        </div>
      </div>
    </Content>
  );
}

export default withUser(IndexPage);
