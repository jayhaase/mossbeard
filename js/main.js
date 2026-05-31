/* Mossbeard the Wanderer — main.js */

const supportsWebp = document.createElement('canvas')
  .toDataURL('image/webp')
  .startsWith('data:image/webp');

// ---- Gallery Lightbox ----

const lightbox     = document.getElementById('lightbox');
const lightboxImg  = document.getElementById('lightbox-img');
const btnClose     = document.querySelector('.lightbox-close');
const btnPrev      = document.querySelector('.lightbox-prev');
const btnNext      = document.querySelector('.lightbox-next');
const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));

const focusableInLightbox = [btnClose, btnPrev, btnNext];

let currentIndex = 0;

function setLightboxImage(index) {
  const item = galleryItems[index];
  const src = supportsWebp && item.dataset.webp ? item.dataset.webp : item.dataset.src;
  lightboxImg.src = src;
  lightboxImg.alt = item.dataset.alt;
  lightbox.setAttribute('aria-label', item.dataset.label);
}

if (galleryItems.length > 0 && lightbox && lightboxImg) {
  function openLightbox(index) {
    currentIndex = index;
    setLightboxImage(currentIndex);
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
    setLightboxImage(currentIndex);
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    setLightboxImage(currentIndex);
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

    if (e.key === 'Escape')     { closeLightbox(); return; }
    if (e.key === 'ArrowLeft')  { showPrev(); return; }
    if (e.key === 'ArrowRight') { showNext(); return; }

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

if (navToggle && mainNav && navLinksEl) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', isOpen);
    navToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  });

  navLinksEl.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open navigation menu');
    });
  });

  document.addEventListener('click', (e) => {
    if (mainNav.classList.contains('nav-open') && !mainNav.contains(e.target)) {
      mainNav.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open navigation menu');
    }
  });
}


// ---- Sticky Nav: highlight active section ----

const sections  = Array.from(document.querySelectorAll('section[id]'));
const navLinks  = Array.from(document.querySelectorAll('.nav-links a'));

if (mainNav && navLinks.length > 0) {
  const navHeight = mainNav.offsetHeight;

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
}


// ---- Scroll Reveal ----

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  rootMargin: '0px 0px -60px 0px',
  threshold: 0.08,
});

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));


// ---- Hero parallax (fixed-background effect while scrolling past hero) ----

const heroSection = document.getElementById('hero');
const heroImage   = document.querySelector('.hero-image');
const parallaxMq  = window.matchMedia('(min-width: 768px) and (prefers-reduced-motion: no-preference)');

function setHeroParallaxEnabled(enabled) {
  if (!heroSection) return;
  heroSection.classList.toggle('hero-parallax', enabled);
  if (!enabled && heroImage) heroImage.style.transform = '';
}

function updateHeroParallax() {
  if (!heroSection || !heroImage || !heroSection.classList.contains('hero-parallax')) return;

  const scrollY = window.scrollY;
  const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;

  if (scrollY >= heroBottom) {
    heroImage.style.transform = '';
    return;
  }

  heroImage.style.transform = `translate3d(0, ${scrollY}px, 0)`;
}

if (heroSection && heroImage) {
  function onParallaxPreferenceChange() {
    const enabled = parallaxMq.matches;
    setHeroParallaxEnabled(enabled);
    if (enabled) updateHeroParallax();
  }

  onParallaxPreferenceChange();
  parallaxMq.addEventListener('change', onParallaxPreferenceChange);

  let parallaxTicking = false;
  window.addEventListener('scroll', () => {
    if (!heroSection.classList.contains('hero-parallax')) return;
    if (!parallaxTicking) {
      requestAnimationFrame(() => {
        updateHeroParallax();
        parallaxTicking = false;
      });
      parallaxTicking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', updateHeroParallax, { passive: true });
}
