// Ocultar/mostrar menú al hacer scroll
let prevScrollPos = window.pageYOffset;
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  const currentScrollPos = window.pageYOffset;
  if (prevScrollPos > currentScrollPos) {
    navbar.style.top = "0";
  } else {
    navbar.style.top = "-70px"; // altura aproximada del menú
  }
  prevScrollPos = currentScrollPos;
});

// Animaciones al hacer scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-visible");
    }
  });
});

document.querySelectorAll(".animate-fade").forEach((el) => observer.observe(el));

// Carrusel automático (para portada)
const carousel = document.getElementById("carousel");
if (carousel) {
  let index = 0;
  const slides = carousel.querySelectorAll("img");
  setInterval(() => {
    slides.forEach((slide, i) => {
      slide.style.opacity = i === index ? "1" : "0";
    });
    index = (index + 1) % slides.length;
  }, 4000);
}

// Validación básica del formulario de contacto
const form = document.querySelector("form");
if (form) {
  form.addEventListener("submit", function (e) {
    const nombre = form.querySelector("input[name='nombre']");
    const email = form.querySelector("input[name='email']");
    const consulta = form.querySelector("textarea");

    if (!nombre.value.trim() || !email.value.trim() || !consulta.value.trim()) {
      e.preventDefault();
      alert("Por favor, completa todos los campos.");
    } else if (!email.value.includes("@")) {
      e.preventDefault();
      alert("Introduce un correo electrónico válido.");
    }
  });
}

// Scroll suave para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});
