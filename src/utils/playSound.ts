import sounds from '../sounds';

export default function playSound(name: string) {
  const userVolume = localStorage.getItem('volume');

  const audio = new Audio();
  audio.src = sounds[name];
  audio.volume = Number(userVolume ?? 0);
  audio.autoplay = true;
}
