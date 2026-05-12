/* Mossbeard the Wanderer — main.js */

// ---- Gallery Lightbox ----

const lightbox     = document.getElementById('lightbox');
const lightboxImg  = document.getElementById('lightbox-img');
const btnClose     = document.querySelector('.lightbox-close');
const btnPrev      = document.querySelector('.lightbox-prev');
const btnNext      = document.querySelector('.lightbox-next');
const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));

let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  const item = galleryItems[currentIndex];
  lightboxImg.src = item.dataset.src;
  lightboxImg.alt = item.dataset.alt;
  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';
  btnClose.focus();
}

function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = '';
  galleryItems[currentIndex].focus();
}

function showPrev() {
  currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
  const item = galleryItems[currentIndex];
  lightboxImg.src = item.dataset.src;
  lightboxImg.alt = item.dataset.alt;
}

function showNext() {
  currentIndex = (currentIndex + 1) % galleryItems.length;
  const item = galleryItems[currentIndex];
  lightboxImg.src = item.dataset.src;
  lightboxImg.alt = item.dataset.alt;
}

galleryItems.forEach((item, i) => {
  item.addEventListener('click', () => openLightbox(i));
});

btnClose.addEventListener('click', closeLightbox);
btnPrev.addEventListener('click', showPrev);
btnNext.addEventListener('click', showNext);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (lightbox.hidden) return;
  if (e.key === 'Escape')      closeLightbox();
  if (e.key === 'ArrowLeft')   showPrev();
  if (e.key === 'ArrowRight')  showNext();
});


// ---- Sticky Nav: highlight active section ----

const sections  = Array.from(document.querySelectorAll('section[id]'));
const navLinks  = Array.from(document.querySelectorAll('#main-nav a'));

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((link) => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === `#${entry.target.id}`
        );
      });
    }
  });
}, {
  rootMargin: `-${54}px 0px -60% 0px`,
  threshold: 0,
});

sections.forEach((s) => navObserver.observe(s));
