import DiffCamEngine from './diff-cam-engine';
import { start, setPlaybackSpeed } from './audio.js';

export default function initSite() {
  const video = document.getElementById('video');
  const canvas = document.getElementById('motion');
  const score = document.getElementById('score');
  const audio = document.getElementById('audio');

  // Load the audio file
  audio.onclick = function() {
    start();
  };

  function initSuccess() {
    DiffCamEngine.start();
  }

  function initError() {
    alert('Something went wrong.');
  }

  function capture(payload) {
    score.textContent = payload.score;
    setPlaybackSpeed(payload.score);
  }

  DiffCamEngine.init({
    video: video,
    motionCanvas: canvas,
    initSuccessCallback: initSuccess,
    initErrorCallback: initError,
    captureCallback: capture,
  });
}
