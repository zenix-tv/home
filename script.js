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

if (closeVideo && videoModal) {
  closeVideo.addEventListener("click", () => {
    videoModal.classList.remove("active");
    document.body.classList.remove("modal-open");

    if (iframe) {
      iframe.src = iframe.src;
    }
  });
}

if (videoModal) {
  videoModal.addEventListener("click", (e) => {
    if (e.target === videoModal) {
      videoModal.classList.remove("active");
      document.body.classList.remove("modal-open");

      if (iframe) {
        iframe.src = iframe.src;
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
/* CONTADOR HERO PRO */
const counters = document.querySelectorAll(".counter");

function formatNumber(num) {
  return new Intl.NumberFormat("es-ES").format(num);
}

function runCounter(counter) {
  const target = Number(counter.dataset.target);
  const duration = 1600;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 4);
    const value = Math.floor(ease * target);

    counter.textContent = formatNumber(value);

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      counter.textContent = formatNumber(target);
    }
  }

  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !entry.target.classList.contains("counted")) {
      entry.target.classList.add("counted");
      runCounter(entry.target);
    }
  });
}, { threshold: 0.6 });

counters.forEach((counter) => counterObserver.observe(counter));
