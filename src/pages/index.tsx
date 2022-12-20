import {
  type ChangeEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import Game from '../game/Game';
import Content from '../components/Content';
import Button from '../components/Button';
import Select from '../components/Select';

import withUser from '../hoc/withUser';
import { useAddUserMutation } from '../store';
import makeDataSelector from '../store/makeDataSelector';

const colors = [
  { from: '#86efac', to: '#22c55e', name: 'green' },
  { from: '#a5b4fc', to: '#6366f1', name: 'indigo' },
  { from: '#fcd34d', to: '#f59e0b', name: 'amber' },
  { from: '#fda4af', to: '#f43f5e', name: 'rose' },
];

const game = new Game();

const statsSelector = makeDataSelector('gameStats');

function formattedTime(time: number) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${(minutes < 10) ? `0${minutes}` : minutes}:${(seconds < 10) ? `0${seconds}` : seconds}`;
}

function IndexPage({ user }: { user?: User }) {
  const [boardSize, setBoardSize] = useState(4);
  const [gameScore, setGameScore] = useState(0);
  const [tileFillColors, setTileFillColors] = useState(['#86efac', '#22c55e']);
  const [fillImage, setFillImage] = useState<HTMLImageElement | undefined>();
  const [isHintVisible, setIsHintVisible] = useState(false);
  const [gameState, setGameState] = useState(game.state);
  const [postScore] = useAddUserMutation();
  const { moves, time } = useSelector(statsSelector);

  const gameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gameContainer = gameRef.current;
    if (!canvas) throw new Error('Error');

    game.init(canvas, {
      boardSize,
      fieldFillColors: '#374251',
      tileFillColors,
      image: fillImage,
      onPuzzleSolved: (score) => {
        postScore({
          data: {
            ...user,
            score,
          },
          teamName: 'babylon',
          ratingFieldName: 'score',
        });
        setGameScore(score);
      },
    });

    let fullscreenHandler: (event: KeyboardEvent) => void;

    if (gameContainer && document.fullscreenEnabled) {
      fullscreenHandler = (event: KeyboardEvent) => {
        if (event.code === 'KeyF') {
          if (document.fullscreenElement) {
            document.exitFullscreen();
          } else {
            gameContainer.requestFullscreen();
          }
        }
      };
      document.addEventListener('keydown', fullscreenHandler);
    }

    return () => {
      game.stop();
      document.removeEventListener('keydown', fullscreenHandler);
    };
  }, [game, boardSize, tileFillColors, fillImage]);

  const handleImageLoad = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          setFillImage(img);
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Content heading="Game" className="flex w-full h-[calc(100vh_-_128px)]">
      <div
        ref={gameRef}
        className={classnames(
          'flex gap-5 m-auto p-6 w-[750px] h-[530px] rounded-2xl',
          'bg-[#374251] relative items-stretch justify-between',
        )}
      >
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={480}
            height={480}
          />
          {fillImage && (
            <img
              src={fillImage?.src}
              alt=""
              className={classnames(
                'absolute top-0 left-0 w-full h-full object-cover',
                {
                  hidden: !isHintVisible && gameState !== 'solved',
                },
              )}
            />
          )}
        </div>
        <div className="text-white text-3xl w-full max-w-[350px]">
          <p className="my-3">
            Moves:&nbsp;
            {moves}
          </p>
          <p className="my-3">
            Time:&nbsp;
            {formattedTime(time)}
          </p>
          {gameScore > 0 ? (
            <p className="my-3">
              Score:&nbsp;
              {gameScore}
            </p>
          ) : (
            <p className="my-3">
              &nbsp;
            </p>
          )}
          <Button
            className="w-full mb-3"
            variant="filled"
            color="green"
            as={Link}
            to="/"
            onClick={() => {
              if (gameState === 'stopped') {
                game.start();
              } else {
                game.stop();
                setGameScore(0);
              }
              setGameState(game.state);
            }}
          >
            {game.state === 'stopped' ? 'Start' : 'Stop'}
          </Button>
          <Select
            value={boardSize}
            onChange={(value) => {
              game.stop();
              setGameState(game.state);
              setGameScore(0);
              setBoardSize(Number(value));
            }}
            options={[
              { value: 3, label: '3x3' },
              { value: 4, label: '4x4' },
              { value: 5, label: '5x5' },
              { value: 6, label: '6x6' },
            ]}
          />
          <div className="my-3 grid grid-cols-2 grid-rows-2 gap-3">
            {colors.map(({ from, to, name }) => (
              <Button
                key={name}
                onClick={() => {
                  setTileFillColors([from, to]);
                  setFillImage(undefined);
                }}
                variant="filled"
                className={classnames(
                  'w-full h-12 bg-gradient-to-br rounded',
                  {
                    'from-green-300 to-green-500': name === 'green',
                    'from-indigo-300 to-indigo-500': name === 'indigo',
                    'from-amber-300 to-amber-500': name === 'amber',
                    'from-rose-300 to-rose-500': name === 'rose',
                  },
                )}
              />
            ))}
          </div>
          {fillImage ? (
            <Button
              variant="filled"
              color="green"
              className="w-full cursor-pointer"
              onClick={() => setFillImage(undefined)}
            >
              Numbers mode
            </Button>
          ) : (
            <label className="flex flex-col justify-between relative" htmlFor="imageInput">
              <Button as="div" variant="filled" color="green" className="w-full cursor-pointer">Image mode</Button>
              <input
                type="file"
                id="imageInput"
                onChange={handleImageLoad}
                className={classnames(
                  'visually-hidden',
                )}
              />
            </label>
          )}
          {fillImage && (
            <Button
              variant="filled"
              color="red"
              className="w-full"
              onMouseDown={() => setIsHintVisible(true)}
              onMouseUp={() => setIsHintVisible(false)}
            >
              Hint
            </Button>
          )}
        </div>
      </div>
    </Content>
  );
}

export default withUser(IndexPage);
