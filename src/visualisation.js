export function initVisualisation() {
  const graph = document.getElementById('graph');
  const canvasContext = graph.getContext('2d');
  const analyser = Howler.ctx.createAnalyser();
  Howler.masterGain.connect(analyser);
  analyser.minDecibels = -90;
  analyser.maxDecibels = -10;
  analyser.smoothingTimeConstant = 0.85;
  visualize(graph, canvasContext, analyser);
}

let drawVisual;
function visualize(canvas, canvasCtx, analyser) {
  const WIDTH = canvas.width;
  const HEIGHT = canvas.height;
  analyser.fftSize = 2048;
  var bufferLength = analyser.fftSize;
  var dataArray = new Uint8Array(bufferLength);
  canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
  var draw = function() {
    drawVisual = requestAnimationFrame(draw);
    analyser.getByteTimeDomainData(dataArray);
    canvasCtx.fillStyle = 'rgb(0, 0, 0)';
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
    canvasCtx.lineWidth = 1;
    canvasCtx.strokeStyle = 'rgb(100, 255, 100)';
    canvasCtx.beginPath();
    var sliceWidth = (WIDTH * 1.0) / bufferLength;
    var x = 0;
    for (var i = 0; i < bufferLength; i++) {
      var v = dataArray[i] / 128.0;
      var y = (v * HEIGHT) / 2;
      if (i === 0) {
        canvasCtx.moveTo(x, y);
      } else {
        canvasCtx.lineTo(x, y);
      }
      x += sliceWidth;
    }
    canvasCtx.lineTo(canvas.width, canvas.height / 2);
    canvasCtx.stroke();
  };
  draw();
}
