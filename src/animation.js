const easeOutQuad = t => {
  return t * (2 - t);
};
const duration = 300;
let animationRequest;
export const startAnimation = (prev, target, callback) => {
  let stop = false;
  let startTime = null;
  // Cancel any animations in progress
  if (animationRequest) {
    cancelAnimationFrame(animationRequest);
  }
  const animate = now => {
    if (stop) return;
    if (now - startTime >= duration) stop = true;
    let delta = (now - startTime) / duration;
    let ease = easeOutQuad(delta);
    const rate = Number.parseFloat(prev + (target - prev) * ease).toFixed(2);
    // Pause playback
    callback(rate);
    animationRequest = requestAnimationFrame(animate);
  };
  const start = time => {
    startTime = time;
    animationRequest = requestAnimationFrame(animate);
  };
  animationRequest = requestAnimationFrame(start);
};
