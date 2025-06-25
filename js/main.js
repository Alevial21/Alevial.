// Variables globales para scroll menú
let lastScrollTop = 0;
const nav = document.querySelector('nav');

// Ocultar/mostrar menú al hacer scroll
window.addEventListener('scroll', () => {
  const st = window.pageYOffset || document.documentElement.scrollTop;
  if (st > lastScrollTop && st > 100) {
    // Scroll hacia abajo: ocultar menú
    nav.classList.add('hidden');
  } else {
    // Scroll hacia arriba: mostrar menú
    nav.classList.remove('hidden');
  }
  lastScrollTop = st <= 0 ? 0 : st; // Para no ir a negativos
});

// CARRUSEL DE FONDO
const slides = document.querySelectorAll('.carrusel-slide');
let currentSlide = 0;
const slideInterval = 6000; // 6 segundos

function nextSlide() {
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide+1) % slides.length;
  slides[currentSlide].classList.add('active');
}

if(slides.length > 0){
  slides[currentSlide].classList.add('active');
  setInterval(nextSlide, slideInterval);
}

// BOTONES CENTRALES - NAVEGACIÓN SUAVE
const botones = document.querySelectorAll('.boton-img');

botones.forEach(boton => {
  boton.addEventListener('click', () => {
    const destino = boton.dataset.destino;
    const seccion = document.getElementById(destino);
    if(seccion){
      seccion.scrollIntoView({behavior: 'smooth'});
    }
  });
});

// ANIMACIONES AL HACER SCROLL (fade-in)
const animatedElements = document.querySelectorAll('.fade-in, .animate-on-scroll');

function checkScroll(){
  const triggerBottom = window.innerHeight * 0.85;
  animatedElements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if(top < triggerBottom){
      el.classList.add('visible');
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
    }
  });
}

window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll);

// LIGHTBOX GALERÍA
const galeria = document.querySelector('.galeria');
if(galeria){
  // Crear overlay lightbox
  const overlay = document.createElement('div');
  overlay.id = 'lightbox-overlay';
  overlay.style.position = 'fixed';
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = '100vw';
  overlay.style.height = '100vh';
  overlay.style.backgroundColor = 'rgba(0,0,0,0.8)';
  overlay.style.display = 'none';
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'center';
  overlay.style.zIndex = '1500';

  // Imagen dentro overlay
  const imgLightbox = document.createElement('img');
  imgLightbox.style.maxWidth = '90%';
  imgLightbox.style.maxHeight = '80%';
  imgLightbox.style.borderRadius = '10px';
  overlay.appendChild(imgLightbox);

  // Botón cerrar
  const btnCerrar = document.createElement('button');
  btnCerrar.textContent = '✕';
  btnCerrar.style.position = 'absolute';
  btnCerrar.style.top = '20px';
  btnCerrar.style.right = '30px';
  btnCerrar.style.fontSize = '2rem';
  btnCerrar.style.color = '#fff';
  btnCerrar.style.background = 'transparent';
  btnCerrar.style.border = 'none';
  btnCerrar.style.cursor = 'pointer';
  btnCerrar.style.userSelect = 'none';
  overlay.appendChild(btnCerrar);

  document.body.appendChild(overlay);

  // Abrir lightbox al clickar imagen
  galeria.querySelectorAll('img').forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
      imgLightbox.src = img.src;
      overlay.style.display = 'flex';
      document.body.style.overflow = 'hidden'; // bloquear scroll fondo
    });
  });

  // Cerrar lightbox
  btnCerrar.addEventListener('click', () => {
    overlay.style.display = 'none';
    document.body.style.overflow = '';
  });

  // Cerrar al clickar fuera de imagen
  overlay.addEventListener('click', e => {
    if(e.target === overlay){
      overlay.style.display = 'none';
      document.body.style.overflow = '';
    }
  });

}
