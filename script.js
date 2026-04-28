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
  const sections = document.querySelectorAll(
    ".devices, .football-banner, .demo-video, .plans, .trust-bar, .top10, .faq, .footer"
  );

  sections.forEach((section) => {
    section.classList.add("reveal");
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, { threshold: 0.18 });

  sections.forEach((section) => observer.observe(section));
});
