/* ================================================================
   script.js — Calendar Dashboard interactivity
   ================================================================ */

// ----------------------------------------------------------------
// Mini calendar
// ----------------------------------------------------------------
(function () {
  // Start at July 2022 as shown in the reference image
  let year = 2022, month = 6; // month is 0-indexed; 6 = July
  let selectedDay = 11;

  const titleEl = document.getElementById('mini-cal-title');
  const daysEl  = document.getElementById('mini-cal-days');

  const MONTHS = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
  ];

  function render() {
    titleEl.textContent = `${MONTHS[month]} ${year}`;
    daysEl.innerHTML = '';

    // First weekday of this month (0=Sun … 6=Sat) → convert to Mon-based (0=Mo … 6=Su)
    const firstDow = new Date(year, month, 1).getDay(); // 0=Sun
    const moFirst  = (firstDow + 6) % 7; // shift so Monday=0

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrev  = new Date(year, month,     0).getDate();

    // Previous month tail
    for (let i = moFirst - 1; i >= 0; i--) {
      const d = daysInPrev - i;
      const el = makeDay(d, 'prev-month');
      daysEl.appendChild(el);
    }

    // Current month
    for (let d = 1; d <= daysInMonth; d++) {
      const el = makeDay(d, 'current', d === selectedDay);
      el.addEventListener('click', () => {
        selectedDay = d;
        render();
      });
      daysEl.appendChild(el);
    }

    // Next month head — fill to complete last row
    const total = moFirst + daysInMonth;
    const remainder = total % 7 === 0 ? 0 : 7 - (total % 7);
    for (let d = 1; d <= remainder; d++) {
      daysEl.appendChild(makeDay(d, 'next-month'));
    }
  }

  function makeDay(num, type, selected) {
    const el = document.createElement('span');
    el.className = 'cal-day' +
      (type === 'prev-month' ? ' prev-month' : '') +
      (type === 'next-month' ? ' next-month' : '') +
      (selected ? ' selected' : '');
    el.textContent = num;
    return el;
  }

  document.getElementById('prev-month').addEventListener('click', () => {
    month--;
    if (month < 0) { month = 11; year--; }
    selectedDay = null;
    render();
  });

  document.getElementById('next-month').addEventListener('click', () => {
    month++;
    if (month > 11) { month = 0; year++; }
    selectedDay = null;
    render();
  });

  render();
})();


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
// Sidebar section collapse/expand toggles
// ----------------------------------------------------------------
(function () {
  const headers = document.querySelectorAll('.section-header[data-target]');
  headers.forEach(header => {
    header.addEventListener('click', () => {
      const targetId = header.getAttribute('data-target');
      const body = document.getElementById(targetId);
      if (!body) return;
      const isCollapsed = body.classList.toggle('collapsed');
      header.classList.toggle('collapsed', isCollapsed);
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
