console.log("ZENIX funcionando 🚀");
const track = document.querySelector('.slider-track');

let paused = false;

track.addEventListener('click', () => {
  paused = !paused;
  track.style.animationPlayState = paused ? 'paused' : 'running';
});
