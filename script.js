const boom = document.getElementById("boomSound");
const enterBtn = document.getElementById("enterBtn");
const track = document.querySelector(".slider-track");

let paused = false;

enterBtn.addEventListener("click", () => {
  boom.currentTime = 0;
  boom.play().catch(() => {});

  document.querySelector(".ligas").scrollIntoView({
    behavior: "smooth"
  });
});

if (track) {
  track.addEventListener("click", () => {
    paused = !paused;
    track.style.animationPlayState = paused ? "paused" : "running";
  });
}
