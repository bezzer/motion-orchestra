import { Howl, Howler } from 'howler';
import debounce from 'lodash.debounce';
const audioURL = require('./imago.mp3');

const sound = new Howl({
  src: [audioURL],
});

export function start() {
  console.log('Starting audio');
  Howler.volume(0.5);
  sound.play();
}

function play() {
  if (!sound.playing()) {
    sound.play();
  }
}

export const setPlaybackSpeed = debounce(speed => {
  play();
  const currentSpeed = Math.min(speed, 200);
  const rate = currentSpeed / 200;
  sound.volume(rate);
  sound.rate(rate);
}, 15);
