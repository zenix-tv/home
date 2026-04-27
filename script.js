const boom = document.getElementById("boomSound");
const enterBtn = document.getElementById("enterBtn");

if (enterBtn) {
  enterBtn.addEventListener("click", () => {
    if (boom) {
      boom.currentTime = 0;
      boom.play().catch(() => {});
    }

    document.getElementById("dispositivos").scrollIntoView({
      behavior: "smooth"
    });
  });
}

/* MODAL VIDEO */
const openVideo = document.getElementById("openVideo");
const closeVideo = document.getElementById("closeVideo");
const videoModal = document.getElementById("videoModal");
const modalVideo = videoModal ? videoModal.querySelector("video") : null;

if (openVideo && videoModal) {
openVideo.addEventListener("click", () => {
  videoModal.classList.add("active");
  document.body.classList.add("modal-open");
});
}

if (closeVideo && videoModal) {
  closeVideo.addEventListener("click", () => {
    videoModal.classList.remove("active");
    if (modalVideo) {
      modalVideo.pause();
      modalVideo.currentTime = 0;
    }
  });
}

if (videoModal) {
  videoModal.addEventListener("click", (e) => {
    if (e.target === videoModal) {
      videoModal.classList.remove("active");
      if (modalVideo) {
        modalVideo.pause();
        modalVideo.currentTime = 0;
      }
    }
  });
}

/* FAQ */
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const button = item.querySelector("button");

  button.addEventListener("click", () => {
    item.classList.toggle("active");
  });
});

/* PAUSAR GALERÍA CON CLICK */
const rankingTrack = document.querySelector(".ranking-track");
let paused = false;

if (rankingTrack) {
  rankingTrack.addEventListener("click", () => {
    paused = !paused;
    rankingTrack.style.animationPlayState = paused ? "paused" : "running";
  });
}
