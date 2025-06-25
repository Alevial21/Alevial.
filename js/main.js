// Menú ocultable al hacer scroll
let lastScrollTop = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > lastScrollTop) {
    // Scroll hacia abajo - ocultar header
    header.style.top = "-70px";
  } else {
    // Scroll hacia arriba - mostrar header
    header.style.top = "0";
  }
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Animaciones con ScrollReveal (debes incluirlo por CDN en HTML)
if(window.ScrollReveal){
  ScrollReveal().reveal('main > *', { 
    duration: 1000, 
    distance: '40px', 
    origin: 'bottom', 
    easing: 'ease-in-out', 
    reset: false, 
    interval: 150 
  });
}

// Carrusel automático simple (en index.html)
const carruselImgs = document.querySelectorAll('.carrusel img');
let currentCarrusel = 0;

function carruselNext() {
  carruselImgs.forEach((img, i) => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 1.5s ease';
  });
  currentCarrusel = (currentCarrusel + 1) % carruselImgs.length;
  carruselImgs[currentCarrusel].style.opacity = '1';
}

if(carruselImgs.length > 1) {
  carruselImgs.forEach((img, i) => {
    img.style.position = 'absolute';
    img.style.top = '0';
    img.style.left = '0';
    img.style.width = '100%';
    img.style.opacity = i === 0 ? '1' : '0';
  });
  setInterval(carruselNext, 5000);
}

// Lightbox para galería
const lightboxOverlay = document.createElement('div');
lightboxOverlay.classList.add('lightbox-overlay');

const lightboxContent = document.createElement('div');
lightboxContent.classList.add('lightbox-content');

const lightboxImage = document.createElement('img');
const lightboxClose = document.createElement('span');
lightboxClose.classList.add('lightbox-close');
lightboxClose.innerHTML = '&times;';

lightboxContent.appendChild(lightboxImage);
lightboxContent.appendChild(lightboxClose);
lightboxOverlay.appendChild(lightboxContent);
document.body.appendChild(lightboxOverlay);

document.querySelectorAll('.masonry-item img').forEach(img => {
  img.addEventListener('click', () => {
    lightboxImage.src = img.src;
    lightboxOverlay.classList.add('active');
  });
});

lightboxClose.addEventListener('click', () => {
  lightboxOverlay.classList.remove('active');
});

lightboxOverlay.addEventListener('click', e => {
  if (e.target === lightboxOverlay) {
    lightboxOverlay.classList.remove('active');
  }
});
