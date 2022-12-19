import soundSrc from '../vendor/sound.mp3';

export default function playSound() {
  const userVolume = localStorage.getItem('volume');

  const audio = new Audio();
  audio.src = soundSrc;
  audio.volume = Number(userVolume ?? 0);
  audio.autoplay = true;
}
