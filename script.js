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

  /* NAVBAR APPLE */
  const navbar = document.querySelector(".navbar");
  let lastScrollY = window.scrollY;

  if (navbar) {
    window.addEventListener("scroll", () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 60) {
        navbar.classList.add("nav-scrolled");
      } else {
        navbar.classList.remove("nav-scrolled");
      }

      if (currentScrollY > lastScrollY && currentScrollY > 140) {
        navbar.classList.add("nav-hidden");
      } else {
        navbar.classList.remove("nav-hidden");
      }

      lastScrollY = currentScrollY;
    });
  }
});
function makeSliderDraggable(sliderSelector, trackSelector) {
  const slider = document.querySelector(sliderSelector);
  const track = document.querySelector(trackSelector);

  if (!slider || !track) return;

  let isDown = false;
  let startX = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let animationId;
  let autoMove = true;

  function getX(e) {
    return e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
  }

  function setPosition() {
    track.style.transform = `translateX(${currentTranslate}px)`;
  }

  function autoScroll() {
    if (autoMove && !isDown) {
      currentTranslate -= 0.5;

      const trackWidth = track.scrollWidth / 2;

      if (Math.abs(currentTranslate) >= trackWidth) {
        currentTranslate = 0;
      }

      prevTranslate = currentTranslate;
      setPosition();
    }

    animationId = requestAnimationFrame(autoScroll);
  }

  function start(e) {
    isDown = true;
    autoMove = false;
    startX = getX(e);
    track.style.animation = "none";
  }

  function move(e) {
    if (!isDown) return;

    const currentX = getX(e);
    const diff = currentX - startX;

    currentTranslate = prevTranslate + diff;
    setPosition();
  }

  function end() {
    if (!isDown) return;

    isDown = false;
    prevTranslate = currentTranslate;

    setTimeout(() => {
      autoMove = true;
    }, 1800);
  }

  slider.addEventListener("mousedown", start);
  slider.addEventListener("mousemove", move);
  slider.addEventListener("mouseup", end);
  slider.addEventListener("mouseleave", end);

  slider.addEventListener("touchstart", start, { passive: true });
  slider.addEventListener("touchmove", move, { passive: true });
  slider.addEventListener("touchend", end);

  cancelAnimationFrame(animationId);
  autoScroll();
}

makeSliderDraggable(".sports-slider", ".sports-track");
makeSliderDraggable(".ranking-slider", ".ranking-track");
