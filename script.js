function entrar() {
  document.getElementById('hero').style.display = 'none';
  document.getElementById('contenido').style.display = 'block';
}

const track = document.querySelector('.slider-track');
let paused = false;

if (track) {
  track.addEventListener('click', () => {
    paused = !paused;
    track.style.animationPlayState = paused ? 'paused' : 'running';
  });
}
