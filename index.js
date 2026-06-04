/* ============================================================
   YOUR WAY TRAVEL — index.js
   Homepage: loads trip and review teasers from JSON files
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Trip Highlights Teaser ──
     Fetches trips/trips.json and renders the first 3 cards
  ── */
  fetch('trips/trips.json')
    .then(res => res.json())
    .then(trips => {
      const container = document.getElementById('trips-teaser');
      container.innerHTML = '';

      const preview = trips.slice(0, 3);

      preview.forEach(trip => {
        const card = document.createElement('div');
        card.className = 'teaser-card';

        // Build media element based on type
        let mediaHTML = '';
        if (trip.src && trip.type === 'video') {
          mediaHTML = `
            <video class="teaser-card__media" muted loop playsinline preload="metadata">
              <source src="trips/${trip.src}" type="video/mp4">
            </video>`;
        } else if (trip.src && trip.type === 'image') {
          mediaHTML = `<img class="teaser-card__media" src="trips/${trip.src}" alt="${trip.title}" loading="lazy">`;
        } else {
          mediaHTML = `<div class="teaser-card__media-placeholder">📸 Photo Coming Soon</div>`;
        }

        card.innerHTML = `
          ${mediaHTML}
          <div class="teaser-card__body">
            <p class="teaser-card__tag">${trip.destination}</p>
            <h3>${trip.title}</h3>
            <p>${trip.description.substring(0, 100)}...</p>
          </div>`;

        container.appendChild(card);
      });
    })
    .catch(() => {
      document.getElementById('trips-teaser').innerHTML =
        '<p class="loading-text">Trip previews coming soon.</p>';
    });


  /* ── Reviews Teaser ──
     Fetches reviews/reviews.json and renders the first 2 cards
  ── */
  fetch('reviews/reviews.json')
    .then(res => res.json())
    .then(reviews => {
      const container = document.getElementById('reviews-teaser');
      container.innerHTML = '';

      const preview = reviews.slice(0, 2);

      preview.forEach(review => {
        const card = document.createElement('div');
        card.className = 'review-teaser-card';

        card.innerHTML = `
          <p class="review-teaser-card__name">${review.name}</p>
          <p class="review-teaser-card__location">📍 ${review.location}</p>
          <p class="review-teaser-card__text">"${review.review.substring(0, 180)}..."</p>`;

        container.appendChild(card);
      });
    })
    .catch(() => {
      document.getElementById('reviews-teaser').innerHTML =
        '<p class="loading-text">Reviews coming soon.</p>';
    });

});
