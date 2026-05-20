async function cargarContenido() {

  try {

    const response = await fetch("./contenido.json");
    const data = await response.json();

    /* HERO */
    const heroCanales = document.getElementById("heroCanales");
    const heroPeliculas = document.getElementById("heroPeliculas");
    const heroTitulo = document.getElementById("heroTitulo");
    const heroBoton = document.getElementById("heroBoton");

    if(heroCanales){
      heroCanales.textContent =
        Number(data.hero.canales).toLocaleString("es-ES");
    }

    if(heroPeliculas){
      heroPeliculas.textContent =
        Number(data.hero.peliculas).toLocaleString("es-ES");
    }

    if(heroTitulo){
      heroTitulo.textContent = data.hero.titulo;
    }

    if(heroBoton){
      heroBoton.textContent = data.hero.boton;
    }

  } catch(error){

    console.log("Error cargando contenido.json", error);

  }
}

cargarContenido();
document.addEventListener("DOMContentLoaded", () => {
  const boom = document.getElementById("boomSound");
  const enterBtn = document.getElementById("enterBtn");

  if (enterBtn) {
    enterBtn.addEventListener("click", () => {
      if (boom) {
        boom.currentTime = 0;
        boom.play().catch(() => {});
      }

      const dispositivos = document.getElementById("dispositivos");
      if (dispositivos) {
        dispositivos.scrollIntoView({ behavior: "smooth" });
      }

      setTimeout(() => {
        window.open(
          "https://wa.me/56964180558?text=Hola%20PATAN%20TV,%20quiero%20probar%20el%20servicio",
          "_blank"
        );
      }, 1200);
    });
  }

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

/* FAQ ABRIR / CERRAR */
document.querySelectorAll(".faq-item button").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");

    document.querySelectorAll(".faq-item").forEach((faq) => {
      if (faq !== item) {
        faq.classList.remove("active");
      }
    });

    item.classList.toggle("active");
  });
});

  const revealElements = document.querySelectorAll(".reveal");

  function revealOnScroll() {
    revealElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        el.classList.add("active");
      }
    });
  }

  revealOnScroll();
  window.addEventListener("scroll", revealOnScroll);

  document.querySelectorAll(".draggable-slider").forEach((slider) => {
    const track = slider.querySelector(".ranking-track, .sports-track");
    if (!track) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

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

  /* CONTADOR ZENIX */
  document.querySelectorAll(".counter").forEach((counter) => {
    const target = Number(counter.getAttribute("data-target"));
    let current = 0;
    const increment = target / 120;

    function updateCounter() {
      current += increment;

      if (current < target) {
        counter.textContent = Math.floor(current).toLocaleString("es-ES");
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target.toLocaleString("es-ES");
      }
    }

    updateCounter();
  });
});
/* OCULTAR NAVBAR AL BAJAR */
let lastScroll = 0;

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

  const currentScroll = window.pageYOffset;

  if (!navbar) return;

  /* BAJANDO */
  if (currentScroll > lastScroll && currentScroll > 120) {
    navbar.classList.add("nav-hidden");
  } 
  
  /* SUBIENDO */
  else {
    navbar.classList.remove("nav-hidden");
  }

  lastScroll = currentScroll;

});

/* INTRO PATAN - DESBLOQUEAR SCROLL */
window.addEventListener("load", () => {
  const intro = document.getElementById("patanIntro");

  document.body.style.overflowY = "hidden";

  setTimeout(() => {
    if (intro) {
      intro.style.transition = "opacity .8s ease";
      intro.style.opacity = "0";

      setTimeout(() => {
        intro.style.display = "none";
        document.body.style.overflowY = "auto";
        document.documentElement.style.overflowY = "auto";
      }, 800);
    } else {
      document.body.style.overflowY = "auto";
      document.documentElement.style.overflowY = "auto";
    }
  }, 4500);
});
window.addEventListener("load", () => {

  document.body.style.overflow = "hidden";

  setTimeout(() => {

    const intro = document.getElementById("patanIntro");

    if(intro){

      intro.style.opacity = "0";

      setTimeout(() => {

        intro.style.display = "none";

        document.body.style.overflowY = "auto";
        document.documentElement.style.overflowY = "auto";

      }, 800);
    }

  }, 4500);

});
/* FAQ FIX DEFINITIVO */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".faq-item").forEach((item) => {
    item.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      document.querySelectorAll(".faq-item").forEach((faq) => {
        faq.classList.remove("active");
      });

      if (!isActive) {
        item.classList.add("active");
      }
    });
  });
});
