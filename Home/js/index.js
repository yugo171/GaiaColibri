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