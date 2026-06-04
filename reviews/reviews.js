/* ============================================================
   YOUR WAY TRAVEL — reviews.js
   Reads reviews.json and renders review cards dynamically.
   Includes a lightbox for review photos.

   HOW TO ADD A NEW REVIEW:
   1. Open reviews/reviews.json
   2. Add a new object to the array:
      {
        "name": "Traveler Name",
        "location": "City, State",
        "review": "Their review text here.",
        "images": [
          "assets/images/reviews/photo1.jpg",
          "assets/images/reviews/photo2.jpg"
        ]
      }
   3. The "images" array is OPTIONAL.
      - Leave it as [] for no photos, or omit the key entirely.
      - You can include 1, 2, or up to 3 image paths.
   4. Place image files in: reviews/assets/images/reviews/
   5. Save — the page updates automatically.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  const list = document.getElementById('reviews-list');

  /* ── Load reviews.json ── */
  fetch('reviews.json')
    .then(res => {
      if (!res.ok) throw new Error('Could not load reviews.json');
      return res.json();
    })
    .then(reviews => {
      list.innerHTML = '';

      if (!reviews.length) {
        list.innerHTML = '<p class="loading-text">No reviews yet — check back soon!</p>';
        return;
      }

      reviews.forEach(review => {
        const card = buildCard(review);
        list.appendChild(card);
      });

      initLightbox();
    })
    .catch(err => {
      console.error(err);
      list.innerHTML = '<p class="loading-text">Reviews could not be loaded. Please try again later.</p>';
    });


  /* ── Build a single review card ── */
  function buildCard(review) {
    const card = document.createElement('article');
    card.className = 'review-card';

    /* ── IMAGES BLOCK ──
       Up to 3 images per review.
       Images are read from the "images" array in reviews.json.

       To add images to a review:
         1. Drop the image files into: reviews/assets/images/reviews/
         2. Update the "images" array in reviews.json with the filenames.
            Example: "images": ["assets/images/reviews/trip1.jpg"]
         3. Leave "images": [] for no photos — the gallery area is hidden automatically.
    ── */
    const images = Array.isArray(review.images) ? review.images.slice(0, 3) : [];

    let imagesHTML = '';
    if (images.length > 0) {
      const imgTags = images.map(src =>
        `<img class="review-card__photo" src="${src}" alt="Trip photo by ${review.name}" loading="lazy">`
      ).join('');
      imagesHTML = `<div class="review-card__images">${imgTags}</div>`;
    } else {
      // Placeholder note — visible until real images are added
      // To hide this placeholder, remove the review-card__images-placeholder div below
      imagesHTML = `
        <div class="review-card__images"></div>
        <p class="review-card__images-placeholder">
          <!-- PLACEHOLDER: Add up to 3 image paths to the "images" array in reviews.json to show photos here -->
          📷 Photos can be added to this review in reviews.json
        </p>`;
    }

    card.innerHTML = `
      <div class="review-card__header">
        <div class="review-card__identity">
          <p class="review-card__name">${review.name}</p>
          <p class="review-card__location">📍 ${review.location}</p>
        </div>
        <span class="review-card__quote-mark">"</span>
      </div>
      <p class="review-card__text">${review.review}</p>
      ${imagesHTML}`;

    return card;
  }


  /* ── Lightbox for review photos ── */
  function initLightbox() {

    // Create the overlay element once
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.innerHTML = `
      <button class="lightbox-close" aria-label="Close image">&times;</button>
      <img src="" alt="Enlarged review photo">`;
    document.body.appendChild(overlay);

    const lightboxImg = overlay.querySelector('img');
    const closeBtn    = overlay.querySelector('.lightbox-close');

    // Open on any review photo click
    document.querySelectorAll('.review-card__photo').forEach(photo => {
      photo.addEventListener('click', () => {
        lightboxImg.src = photo.src;
        lightboxImg.alt = photo.alt;
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    // Close on button click, overlay click, or Escape key
    closeBtn.addEventListener('click', closeLightbox);
    overlay.addEventListener('click', e => {
      if (e.target === overlay) closeLightbox();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeLightbox();
    });

    function closeLightbox() {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

});
