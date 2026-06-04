/* ============================================================
   YOUR WAY TRAVEL — global.js
   Shared behavior: navbar hamburger, active link highlighting
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Hamburger Menu Toggle ── */
  const hamburger = document.querySelector('.navbar__hamburger');
  const navLinks  = document.querySelector('.navbar__links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Close menu when a link is clicked (mobile)
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  /* ── Active Nav Link ──
     Compares the current page URL to each nav link's href
     and adds the "active" class to the matching link.
  ── */
  const currentPath = window.location.pathname;

  document.querySelectorAll('.navbar__links a').forEach(link => {
    const linkPath = new URL(link.href, window.location.origin).pathname;

    // Normalize: treat /index.html and / as the same
    const normCurrent = currentPath.replace(/\/index\.html$/, '/') || '/';
    const normLink    = linkPath.replace(/\/index\.html$/, '/') || '/';

    if (normCurrent === normLink || (normLink !== '/' && normCurrent.startsWith(normLink))) {
      link.classList.add('active');
    }
  });

});
