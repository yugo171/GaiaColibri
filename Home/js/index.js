//elementos 
const navbar = document.querySelector("#navbar");

// Se você for usar carrossel depois, mantenha esta base:
const projectsContainer = document.querySelector(".projects");
const left = document.getElementById("left");
const right = document.getElementById("right");

// NAVBAR: muda cor no scroll
window.addEventListener("scroll", () => {
  if (window.scrollY > 80) {
    navbar.classList.add("navbar-scrolled");
  } else {
    navbar.classList.remove("navbar-scrolled");
  }
});

// ANIMAÇÕES AO ROLAR (reveal)
const revealElements = document.querySelectorAll(
  ".section, .hero, .info-card, .team-card"
);

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;
  const offset = 120;

  revealElements.forEach((el) => {
    const rect = el.getBoundingClientRect();

    // entra na tela → adiciona is-visible
    if (rect.top < windowHeight - offset && rect.bottom > offset) {
      el.classList.add("is-visible");
    } else {
      // saiu da tela → remove is-visible
      el.classList.remove("is-visible");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// CONTROLES DE CARROSSEL (se você criar .projects, left, right no HTML)
if (projectsContainer && left && right) {
  right.addEventListener("click", () => {
    projectsContainer.scrollLeft += window.innerWidth;
  });

  left.addEventListener("click", () => {
    projectsContainer.scrollLeft -= window.innerWidth;
  });
}
// CARROSSEL DE CLIENTES – rolagem horizontal suave
const clientsTrack = document.getElementById("clients-track");
const clientsLeft = document.getElementById("clients-left");
const clientsRight = document.getElementById("clients-right");

if (clientsTrack && clientsLeft && clientsRight) {
  const intervalMs = 5000;   // 5s entre auto-scrolls
  let autoScrollId = null;

  // passo de scroll: ~1 tela (largura visível)
  const getStep = () => clientsTrack.clientWidth;

  const scrollNext = () => {
    const step = getStep();
    const maxScrollLeft = clientsTrack.scrollWidth - clientsTrack.clientWidth;

    // se estiver perto do fim, volta pro começo
    if (clientsTrack.scrollLeft + step >= maxScrollLeft - 5) {
      clientsTrack.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    } else {
      clientsTrack.scrollBy({
        left: step,
        behavior: "smooth",
      });
    }
  };

  const scrollPrev = () => {
    const step = getStep();
    const maxScrollLeft = clientsTrack.scrollWidth - clientsTrack.clientWidth;

    if (clientsTrack.scrollLeft - step <= 0) {
      clientsTrack.scrollTo({
        left: maxScrollLeft,
        behavior: "smooth",
      });
    } else {
      clientsTrack.scrollBy({
        left: -step,
        behavior: "smooth",
      });
    }
  };

  // cliques nas setas
  clientsRight.addEventListener("click", () => {
    scrollNext();
    restartAutoScroll();
  });

  clientsLeft.addEventListener("click", () => {
    scrollPrev();
    restartAutoScroll();
  });

  // auto–scroll a cada 5 segundos
  const startAutoScroll = () => {
    if (autoScrollId) return;
    autoScrollId = setInterval(scrollNext, intervalMs);
  };

  const stopAutoScroll = () => {
    if (!autoScrollId) return;
    clearInterval(autoScrollId);
    autoScrollId = null;
  };

  const restartAutoScroll = () => {
    stopAutoScroll();
    startAutoScroll();
  };

  // pausa quando o mouse entra, volta quando sai
  clientsTrack.addEventListener("mouseenter", stopAutoScroll);
  clientsTrack.addEventListener("mouseleave", startAutoScroll);

  // se o tamanho da janela mudar, não precisa recalcular página, só mantém scroll
  window.addEventListener("resize", () => {
    // opcional: você pode ajustar algo aqui se quiser
  });

  // começa do início
  clientsTrack.scrollLeft = 0;
  startAutoScroll();
}