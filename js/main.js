/* Mossbeard the Wanderer — main.js */

// ---- Gallery Lightbox ----

const lightbox     = document.getElementById('lightbox');
const lightboxImg  = document.getElementById('lightbox-img');
const btnClose     = document.querySelector('.lightbox-close');
const btnPrev      = document.querySelector('.lightbox-prev');
const btnNext      = document.querySelector('.lightbox-next');
const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));

// All focusable elements inside the lightbox, in DOM order
const focusableInLightbox = [btnClose, btnPrev, btnNext];

let currentIndex = 0;

if (galleryItems.length > 0) {
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

  // Single keydown handler: focus trap + Escape/Arrow navigation
  document.addEventListener('keydown', (e) => {
    if (lightbox.hidden) return;

    // Escape / Arrow keys
    if (e.key === 'Escape')     { closeLightbox(); return; }
    if (e.key === 'ArrowLeft')  { showPrev(); return; }
    if (e.key === 'ArrowRight') { showNext(); return; }

    // Focus trap: keep Tab/Shift+Tab cycling within the lightbox buttons
    if (e.key === 'Tab') {
      const first = focusableInLightbox[0];
      const last  = focusableInLightbox[focusableInLightbox.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
      }
    }
  });
}


// ---- Mobile Nav Toggle ----

const mainNav    = document.getElementById('main-nav');
const navToggle  = document.querySelector('.nav-toggle');
const navLinksEl = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('nav-open');
  navToggle.setAttribute('aria-expanded', isOpen);
  navToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
});

// Close menu when any nav link is clicked
navLinksEl.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open navigation menu');
  });
});

// Close menu on outside click
document.addEventListener('click', (e) => {
  if (mainNav.classList.contains('nav-open') && !mainNav.contains(e.target)) {
    mainNav.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open navigation menu');
  }
});


// ---- Sticky Nav: highlight active section ----

const sections  = Array.from(document.querySelectorAll('section[id]'));
const navLinks  = Array.from(document.querySelectorAll('.nav-links a'));

const navHeight = mainNav ? mainNav.offsetHeight : 54;

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
  rootMargin: `-${navHeight}px 0px -60% 0px`,
  threshold: 0,
});

sections.forEach((s) => navObserver.observe(s));
