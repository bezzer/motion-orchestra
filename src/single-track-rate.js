import { Howl } from 'howler';
import { startAnimation } from './animation';
const audioURL = require('./tracks/new-hero.mp3');

export let sound;
const init = () => {
  sound = new Howl({
    src: [audioURL],
  });
};

let prevTarget = 0;
const setPlaybackSpeed = speed => {
  const target = speed >= 50 ? 1 : 0;
  if (prevTarget !== target) {
    startAnimation(prevTarget, target, rate => {
      if (rate <= 0.01) {
        sound.pause();
        console.log('pausing');
        return;
      } else {
        if (!sound.playing()) {
          console.log('resuming');
          sound.play();
        }
      }
      sound.volume(rate);
      sound.rate(rate);
    });
  }
  prevTarget = target;
};

const stop = () => {
  if (sound) sound.unload();
};

export default {
  init,
  setPlaybackSpeed,
  stop,
};
