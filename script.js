// Reveal sections as they scroll into view

// Mobile nav: toggle the menu open/closed, and close it after a link is tapped
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navlinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Reveal sections as they scroll into view

const revealEls = document.querySelectorAll('.reveal');

const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach((el) => io.observe(el));

// Certificate thumbnails: if an image fails to load (not added yet),
// fall back to the placeholder state instead of showing a broken image icon.
document.querySelectorAll('.cert-thumb img').forEach((img) => {
  img.addEventListener('error', () => {
    const thumb = img.closest('.cert-thumb');
    img.remove();
    thumb.classList.add('is-empty');
    thumb.insertAdjacentHTML('beforeend', `
      <div class="cert-placeholder">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <path d="M21 15l-5-5L5 21"/>
        </svg>
        <span>Certificate image not added yet</span>
      </div>
    `);
  });
});

// Certificate lightbox: click a thumbnail to view it full-size
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

document.querySelectorAll('.cert-thumb').forEach((thumb) => {
  thumb.addEventListener('click', () => {
    const img = thumb.querySelector('img');
    if (!img || !lightbox) return;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('is-open');
  });
});

function closeLightbox() {
  lightbox.classList.remove('is-open');
  lightboxImg.src = '';
}
if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightbox) lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
