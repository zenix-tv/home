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

    if (iframe) {
      iframe.src = iframe.src;
    }
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

  /* CONTADOR HERO */
  const counters = document.querySelectorAll(".counter");

  function formatNumber(num) {
    return new Intl.NumberFormat("es-ES").format(num);
  }

  function animateCounter(counter) {
    const target = Number(counter.dataset.target);
    const duration = 1800;
    const startTime = performance.now();

    counter.style.transition = "transform 0.22s ease, text-shadow 0.22s ease";

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      const value = Math.floor(ease * target);

      counter.textContent = formatNumber(value);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = formatNumber(target);

        /* REBOTE PRO */
        counter.style.transform = "scale(1.22)";
        counter.style.textShadow =
          "0 0 22px rgba(255,161,0,1), 0 0 55px rgba(255,161,0,.9)";

        setTimeout(() => {
          counter.style.transform = "scale(1)";
          counter.style.textShadow = "";
        }, 240);
      }
    }

    requestAnimationFrame(updateCounter);
  }

  setTimeout(() => {
    counters.forEach((counter) => {
      counter.textContent = "0";
      animateCounter(counter);
    });
  }, 2200);

  /* 🔥 SCROLL REVEAL PRO */
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
