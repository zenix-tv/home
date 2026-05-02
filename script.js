document.addEventListener("DOMContentLoaded", () => {
  const boom = document.getElementById("boomSound");
  const enterBtn = document.getElementById("enterBtn");

  /* BOTÓN VER AHORA */
  if (enterBtn) {
    enterBtn.addEventListener("click", () => {
      if (boom) {
        boom.currentTime = 0;
        boom.play().catch(() => {});
      }

      document.getElementById("dispositivos").scrollIntoView({
        behavior: "smooth"
      });

      setTimeout(() => {
        window.open(
          "https://wa.me/56964180558?text=Hola%20ZENIX%20TV,%20quiero%20probar%20el%20servicio",
          "_blank"
        );
      }, 1200);
    });
  }

  /* MODAL VIDEO */
  const openVideo = document.getElementById("openVideo");
  const closeVideo = document.getElementById("closeVideo");
  const videoModal = document.getElementById("videoModal");
  const iframe = videoModal ? videoModal.querySelector("iframe") : null;

  if (openVideo && videoModal) {
    openVideo.addEventListener("click", () => {
      if (boom) {
        boom.currentTime = 0;
        boom.play().catch(() => {});
      }

      videoModal.classList.add("active");
      document.body.classList.add("modal-open");
    });
  }

  function closeModal() {
    if (!videoModal) return;
    videoModal.classList.remove("active");
    document.body.classList.remove("modal-open");
    if (iframe) iframe.src = iframe.src;
  }

  if (closeVideo) closeVideo.addEventListener("click", closeModal);

  if (videoModal) {
    videoModal.addEventListener("click", (e) => {
      if (e.target === videoModal) closeModal();
    });
  }

  /* FAQ */
  document.querySelectorAll(".faq-item").forEach((item) => {
    const button = item.querySelector("button");
    if (button) {
      button.addEventListener("click", () => {
        item.classList.toggle("active");
      });
    }
  });

  /* PAUSAR GALERÍA */
  const rankingTrack = document.querySelector(".ranking-track");
  let paused = false;

  if (rankingTrack) {
    rankingTrack.addEventListener("click", () => {
      paused = !paused;
      rankingTrack.style.animationPlayState = paused ? "paused" : "running";
    });
  }

  /* SCROLL REVEAL PRO */
document.querySelectorAll(".draggable-slider").forEach((slider) => {
  const track = slider.querySelector(".ranking-track, .sports-track");
  if (!track) return;

  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener("mousedown", (e) => {
    isDown = true;
    slider.classList.add("dragging");
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    track.style.animationPlayState = "paused";
  });

  slider.addEventListener("mouseleave", () => {
    isDown = false;
    slider.classList.remove("dragging");
    track.style.animationPlayState = "running";
  });

  slider.addEventListener("mouseup", () => {
    isDown = false;
    slider.classList.remove("dragging");
    track.style.animationPlayState = "running";
  });

  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.4;
    slider.scrollLeft = scrollLeft - walk;
  });

  slider.addEventListener("touchstart", () => {
    track.style.animationPlayState = "paused";
  });

  slider.addEventListener("touchend", () => {
    track.style.animationPlayState = "running";
  });
});
