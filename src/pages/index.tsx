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
import PageMeta from '../components/PageMeta';

import withUser from '../hoc/withUser';
import { useAddUserMutation } from '../store';
import makeDataSelector from '../store/makeDataSelector';
import Range from '../components/Range';
import ToggleButton from '../components/ToggleButton';

const colors = [
  { from: '#86efac', to: '#22c55e', name: 'green' },
  { from: '#a5b4fc', to: '#6366f1', name: 'indigo' },
  { from: '#67e8f9', to: '#06b6d4', name: 'cyan' },
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
  const [isImageMode, setIsImageMode] = useState(false);
  const [isHintVisible, setIsHintVisible] = useState(false);
  const [sound, setSound] = useState<boolean>(false);
  const [volume, setVolume] = useState<string>('0.1');
  const [gameState, setGameState] = useState(game.state);
  const [postScore] = useAddUserMutation();
  const { moves, time } = useSelector(statsSelector);

  const gameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const toggleSound = (enabled: boolean) => {
    if (enabled && volume === '0') {
      setVolume('0.5');
    }

    if (!enabled) {
      setVolume('0');
    }

    setSound(enabled);
    localStorage.setItem('sound', sound ? 'on' : 'off');
  };

  const setVolumeVal = (volumeValue: string) => {
    if (volumeValue === '0') {
      setSound(false);
    }
    if (volumeValue !== '0' && !sound) {
      setSound(true);
    }
    localStorage.setItem('volume', volumeValue);
    setVolume(volumeValue);
  };

  useEffect(() => {
    const userSound = localStorage.getItem('sound');
    const userVolume = localStorage.getItem('volume');

    setSound(userSound === 'on');
    setVolume(userVolume ?? '0');
  }, []);

  useEffect(() => {
    localStorage.setItem('sound', sound ? 'on' : 'off');
    localStorage.setItem('volume', volume);
  }, [sound, volume]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gameContainer = gameRef.current;
    if (!canvas) throw new Error('Error');

    game.init(canvas, {
      boardSize,
      fieldFillColors: '#374251',
      tileFillColors,
      image: fillImage,
      volume: +volume,
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
      game.stop();
    }
  };

  const handleGameModeChange = (value: boolean): void => {
    setIsImageMode(value);
    setFillImage(undefined);
    game.stop();
  };

  return (
    <>
      <PageMeta
        title="15 Puzzle Game"
        description="Play 15 puzzle game online"
      />
      <Content heading="Game" className="flex w-full h-min-[calc(100vh_-_184px)]">
        <div
          ref={gameRef}
          className={classnames(
            'flex gap-5 m-auto p-6 w-[870px] h-[650px] rounded-2xl',
            'bg-orange-300 dark:bg-[#374251] relative items-stretch justify-between',
          )}
        >
          <div className="relative">
            <canvas
              ref={canvasRef}
              width={600}
              height={600}
            />
            {(fillImage || gameState === 'started') && (
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
          <div className="text-gray-700 dark:text-white text-3xl w-full max-w-[350px]">
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
                Score:&nbsp;&mdash;&nbsp;&brvbar;&brvbar;&nbsp;&mdash;
              </p>
            )}
            <Button
              className="w-full btn-orange-filled dark:btn-green-filled"
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

            <div className="my-6">
              <h6 className="text-sm font-bold">Board size:</h6>
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
            </div>
            <div className="relative my-6 align-center">
              <h6 className="text-sm font-bold mb-1">Game sound:</h6>
              <ToggleButton
                id="sound"
                labelLeft="🔇"
                labelRight="🔈"
                checked={sound}
                className="text-base"
                onToggle={toggleSound}
              />
              <Range
                label="Volume:"
                value={volume}
                rangeSlide={setVolumeVal}
                className="text-base mt-1"
              />
            </div>
            <div className="my-6">
              <h6 className="text-sm font-bold mb-1">Game mode:</h6>
              <ToggleButton
                id="fillType"
                checked={isImageMode}
                labelLeft="Numbers"
                labelRight="Image"
                className="text-base"
                onToggle={handleGameModeChange}
              />
              {isImageMode ? (
                <div className="my-3 grid gap-3 items-center">
                  <label className="flex flex-col justify-between relative" htmlFor="imageInput">
                    <Button
                      as="div"
                      className="w-full cursor-pointer h-12 btn-orange-filled dark:btn-green-filled"
                    >
                      Select image
                    </Button>
                    <input
                      type="file"
                      id="imageInput"
                      onChange={handleImageLoad}
                      className={classnames(
                        'visually-hidden',
                      )}
                    />
                  </label>
                  <Button
                    disabled={!fillImage}
                    className="w-full h-12 btn-red-outline"
                    onMouseDown={() => setIsHintVisible(true)}
                    onMouseUp={() => setIsHintVisible(false)}
                  >
                    Hint
                  </Button>
                </div>
              ) : (
                <div className="my-3 grid grid-cols-2 grid-rows-2 gap-3">
                  {colors.map(({ from, to, name }) => (
                    <Button
                      key={name}
                      onClick={() => {
                        setTileFillColors([from, to]);
                        setFillImage(undefined);
                      }}
                      className={classnames(
                        'w-full h-12 bg-gradient-to-br rounded',
                        {
                          'from-green-300 to-green-500': name === 'green',
                          'from-indigo-300 to-indigo-500': name === 'indigo',
                          'from-cyan-300 to-cyan-500': name === 'cyan',
                          'from-rose-300 to-rose-500': name === 'rose',
                        },
                      )}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Content>
    </>
  );
}

export default withUser(IndexPage);
