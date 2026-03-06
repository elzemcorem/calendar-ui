/* ================================================================
   script.js — Calendar Dashboard interactivity
   ================================================================ */


// ----------------------------------------------------------------
// Segmented control (Month / Week / Day)
// ----------------------------------------------------------------
(function () {
  const btns = document.querySelectorAll('.seg-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
})();


// ----------------------------------------------------------------
// Week day selector
// ----------------------------------------------------------------
(function () {
  const days = document.querySelectorAll('.week-day');
  days.forEach(day => {
    day.addEventListener('click', () => {
      days.forEach(d => d.setAttribute('data-selected', 'false'));
      day.setAttribute('data-selected', 'true');
    });
  });
})();


// ----------------------------------------------------------------
// App bar nav link active state
// ----------------------------------------------------------------
(function () {
  const links = document.querySelectorAll('.nav-link[data-nav]');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });
})();


// ----------------------------------------------------------------
// Modal open / close
// ----------------------------------------------------------------
(function () {
  const overlay = document.getElementById('modal-overlay');
  const closeBtn = document.getElementById('modal-close');

  // Close when clicking the X button
  closeBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
  });

  // Re-open modal when clicking the Tuesday "Design Review" or "Unboarding meet" cards
  // (Optional — clicking any event card in col-tue could open it)
  const tuesdayCards = document.querySelectorAll('#col-tue .event-card:not(.ev-dashed)');
  tuesdayCards.forEach(card => {
    card.addEventListener('click', () => {
      overlay.style.display = 'block';
    });
  });
})();


// ----------------------------------------------------------------
// Keyboard accessibility — close modal on Escape
// ----------------------------------------------------------------
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const overlay = document.getElementById('modal-overlay');
    if (overlay) overlay.style.display = 'none';
  }
});
