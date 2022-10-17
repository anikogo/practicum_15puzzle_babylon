import { store } from '../store';

export default class Stats {
  #movesCount: number;

  #time: number;

  #state: string;

  #timer: NodeJS.Timer | null;

  constructor() {
    this.#movesCount = 0;
    this.#time = 0;
    this.#state = 'stopped';
    this.#timer = null;
  }

  get state(): string {
    return this.#state;
  }

  get movesCount(): number {
    return this.#movesCount;
  }

  set movesCount(value: number) {
    this.#movesCount = value;
    store.dispatch({ type: 'stats/setMovesCount', payload: this.#movesCount });
  }

  get time(): number {
    return this.#time;
  }

  set time(value: number) {
    this.#time = value;
    store.dispatch({ type: 'stats/setTime', payload: this.#time });
  }

  startTimer() {
    this.#state = 'started';
    const start = Date.now();
    this.#timer = setInterval(() => {
      const delta = Date.now() - start;
      this.time = Math.floor(delta / 1000);
    }, 1000);
  }

  stopTimer() {
    this.#state = 'stopped';
    if (this.#timer) {
      clearInterval(this.#timer);
    }
  }
}
