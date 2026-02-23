const searchInput = document.querySelector('.hs-input');
const searchBtn = document.querySelector('.hs-btn');
const regionSelect = document.querySelector('.hs-region');
const ticker = document.querySelector('.ticker-inner');

// --- Search ---
// TODO: replace with API call to /api/summoner?name=&region=
function handleSearch() {
  const name = searchInput.value.trim();
  const region = regionSelect.value;

  if (!name) {
    searchInput.focus();
    searchInput.style.borderColor = 'var(--accent)';
    return;
  }

  searchBtn.textContent = 'LOADING...';
  searchBtn.style.opacity = '0.6';

  console.log('[search]', { name, region });

  // Placeholder: swap out for fetch('/api/summoner', { method: 'POST', ... })
  setTimeout(() => {
    searchBtn.textContent = 'SEARCH';
    searchBtn.style.opacity = '1';
  }, 1200);
}

searchBtn.addEventListener('click', handleSearch);

searchInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') handleSearch();
});

searchInput.addEventListener('focus', () => {
  searchInput.style.borderColor = 'var(--accent)';
});

searchInput.addEventListener('blur', () => {
  searchInput.style.borderColor = '';
});

// --- Nav: profile & notifications ---
// TODO: on load, fetch('/api/user/me') and populate avatar + unread count
const navAvatar = document.querySelector('.nav-avatar');
const notifDot = document.querySelector('.notif-dot');

navAvatar.addEventListener('click', () => {
  // TODO: open profile dropdown / navigate to /profile
  console.log('[nav] profile clicked');
});

document.querySelector('.nav-notif').addEventListener('click', () => {
  // TODO: open notifications panel, mark as read via API
  console.log('[nav] notifications clicked');
});

// --- Ticker ---
ticker.addEventListener('mouseenter', () => {
  ticker.style.animationPlayState = 'paused';
});

ticker.addEventListener('mouseleave', () => {
  ticker.style.animationPlayState = 'running';
});

// TODO: refresh ticker data from /api/live-stats every 60s
// setInterval(() => fetchLiveStats(), 60_000);

// --- Feature cells entrance ---
const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    el.style.opacity = '0';
    el.style.transform = 'translateY(12px)';
    el.style.transition = `opacity 0.4s ${i * 0.07}s ease, transform 0.4s ${i * 0.07}s ease`;
    requestAnimationFrame(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
    observer.unobserve(el);
  });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-cell').forEach(cell => observer.observe(cell));
