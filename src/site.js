import DiffCamEngine from './diff-cam-engine';
import { initVisualisation } from './visualisation';
import multitrack from './multi-track';
import single from './single-track';
import singleRate from './single-track-rate';

export default function initSite() {
  const video = document.getElementById('video');
  const canvas = document.getElementById('motion');
  const score = document.getElementById('score');
  const selector = document.getElementById('select-audio');

  let selected = null;

  function initToggles() {
    const toggles = document.querySelectorAll('.toggle');
    toggles.forEach(element => {
      element.addEventListener('click', () => {
        const targetEl = document.querySelector(element.dataset.target);
        targetEl.classList.toggle('hidden');
      });
    });
  }
  initToggles();

  selector.addEventListener('change', event => {
    console.log(event);
    switch (event.target.value) {
      case 'single':
        multitrack.stop();
        singleRate.stop();
        initAudio(single);
        break;
      case 'single-rate':
        multitrack.stop();
        single.stop();
        initAudio(singleRate);
        break;
      case 'multi':
        single.stop();
        singleRate.stop();
        initAudio(multitrack);
        break;
      default:
        if (selected) {
          selected.stop();
          selected = null;
        }
    }
  });

  // Start any audio methods
  function initAudio(track) {
    selected = track;
    selected.init();
    initVisualisation();
  }

  function initSuccess() {
    DiffCamEngine.start();
  }

  function initError() {
    alert('Something went wrong.');
  }

  function capture(payload) {
    score.textContent = payload.score;
    if (selected) {
      selected.setPlaybackSpeed(payload.score);
    }
  }

  DiffCamEngine.init({
    video: video,
    motionCanvas: canvas,
    initSuccessCallback: initSuccess,
    initErrorCallback: initError,
    captureCallback: capture,
  });
}
