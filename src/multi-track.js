import { Howl } from 'howler';
import debounce from 'lodash.debounce';
import { startAnimation } from './animation';

const bass = require('./tracks/bass.mp3');
const beat = require('./tracks/beat.mp3');
const keys = require('./tracks/keys.mp3');
const strings = require('./tracks/strings.mp3');

let bassSound, beatSound, keysSound, stringsSound;
const init = async () => {
  // Wait for all sounds to load before playing so that playback is in sync
  await Promise.all([
    new Promise(
      resolve =>
        (bassSound = new Howl({
          src: [bass],
          loop: true,
          volume: 0,
          onload: resolve,
        }))
    ),
    new Promise(
      resolve =>
        (beatSound = new Howl({
          src: [beat],
          loop: true,
          volume: 0,
          onload: resolve,
        }))
    ),
    new Promise(
      resolve =>
        (stringsSound = new Howl({
          src: [strings],
          loop: true,
          volume: 0,
          onload: resolve,
        }))
    ),
    new Promise(
      resolve =>
        (keysSound = new Howl({
          src: [keys],
          loop: true,
          volume: 0,
          onload: resolve,
        }))
    ),
  ]);

  beatSound.play();
  bassSound.play();
  keysSound.play();
  stringsSound.play();
};

const stop = () => {
  if (beatSound) beatSound.unload();
  if (bassSound) bassSound.unload();
  if (keysSound) keysSound.unload();
  if (stringsSound) stringsSound.unload();
};

let prevTarget;
const setPlaybackSpeed = debounce(speed => {
  // target is a value from 0 to 4
  const target = Math.round(Math.min(speed, 400) / 100);

  if (prevTarget !== target) {
    startAnimation(prevTarget, target, rate => {
      console.log(rate);
      beatSound.volume(Math.max(0, Math.min(1, rate)));
      bassSound.volume(Math.max(0, Math.min(1, rate - 1)));
      keysSound.volume(Math.max(0, Math.min(1, rate - 2)));
      stringsSound.volume(Math.max(0, Math.min(1, rate - 3)));
    });
  }
  prevTarget = target;
}, 15);

export default {
  init,
  setPlaybackSpeed,
  stop,
};
