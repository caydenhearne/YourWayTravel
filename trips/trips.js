/* ============================================================
   YOUR WAY TRAVEL — trips.js
   Reads trips.json and renders trip cards dynamically.
   Also handles the All / Photos / Videos filter bar.

   HOW TO ADD A NEW TRIP:
   1. Open trips/trips.json
   2. Add a new object to the array following this structure:
      {
        "title": "Your Trip Title",
        "destination": "City, Country",
        "description": "A short description of the trip.",
        "type": "image",          <-- use "image" or "video"
        "src": "assets/images/trips/your-file.jpg"
                                  <-- path relative to the trips/ folder
      }
   3. For video entries, use "type": "video" and point src to a .mp4 file.
   4. Save the file — the page will update automatically.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  const grid = document.getElementById('trips-grid');

  /* ── Load trips.json ── */
  fetch('trips.json')
    .then(res => {
      if (!res.ok) throw new Error('Could not load trips.json');
      return res.json();
    })
    .then(trips => {
      grid.innerHTML = '';

      if (!trips.length) {
        grid.innerHTML = '<p class="no-results">No trips to show yet — check back soon!</p>';
        return;
      }

      trips.forEach(trip => {
        const card = buildCard(trip);
        grid.appendChild(card);
      });

      initFilters();
    })
    .catch(err => {
      console.error(err);
      grid.innerHTML = '<p class="no-results">Trips could not be loaded. Please try again later.</p>';
    });


  /* ── Build a single trip card ── */
  function buildCard(trip) {
    const card = document.createElement('div');
    card.className = 'trip-card';

    // Store the media type as a data attribute for the filter
    card.dataset.type = trip.type || 'image';

    /* ── MEDIA BLOCK ──
       - If type is "video": renders a <video> element
       - If type is "image": renders an <img> element
       - If src is missing:  renders a placeholder div

       To add media:
         • Place your image or video file in trips/assets/images/trips/
         • Update the "src" field in trips.json to match the filename
    ── */
    let mediaHTML = '';

    if (trip.src && trip.type === 'video') {
      mediaHTML = `
        <div class="trip-card__media-wrap">
          <video class="trip-card__video" controls preload="metadata">
            <source src="${trip.src}" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        </div>`;
    } else if (trip.src && trip.type === 'image') {
      mediaHTML = `
        <div class="trip-card__media-wrap">
          <img class="trip-card__img" src="${trip.src}" alt="${trip.title}" loading="lazy">
        </div>`;
    } else {
      // Placeholder shown when no src is provided
      mediaHTML = `
        <div class="trip-card__media-wrap">
          <div class="trip-card__media-placeholder">
            <span>${trip.type === 'video' ? '🎬' : '📸'}</span>
            Media coming soon
          </div>
        </div>`;
    }

    card.innerHTML = `
      ${mediaHTML}
      <div class="trip-card__body">
        <p class="trip-card__tag">${trip.destination || ''}</p>
        <h2 class="trip-card__title">${trip.title}</h2>
        <p class="trip-card__desc">${trip.description}</p>
      </div>`;

    return card;
  }


  /* ── Filter Bar Logic ── */
  function initFilters() {
    const buttons = document.querySelectorAll('.filter-btn');
    const cards   = document.querySelectorAll('.trip-card');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {

        // Update active button
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        let visibleCount = 0;
        cards.forEach(card => {
          const match = filter === 'all' || card.dataset.type === filter;
          card.classList.toggle('hidden', !match);
          if (match) visibleCount++;
        });

        // Show "no results" message if nothing matches
        let noResults = grid.querySelector('.no-results');
        if (visibleCount === 0) {
          if (!noResults) {
            noResults = document.createElement('p');
            noResults.className = 'no-results';
            noResults.textContent = `No ${filter} entries yet — check back soon!`;
            grid.appendChild(noResults);
          }
        } else if (noResults) {
          noResults.remove();
        }

      });
    });
  }

});
