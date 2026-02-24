const searchInput = document.querySelector('.hs-input');
const searchBtn = document.querySelector('.hs-btn');
const regionSelect = document.querySelector('.hs-region');
const ticker = document.getElementById('ticker');

// --- Search ---
/*
 * Title: Search Handler
 * This function handles the logic when a user submits a search.
 * It reads the summoner name and region, checks if the name is empty,
 * and if so, focuses the input. Otherwise, it updates the button's visual state
 * to indicate loading before the request to the backend happens.
 */
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
const notifDot = document.querySelector('.notif-dot');

document.querySelector('.nav-notif').addEventListener('click', () => {
  console.log('[nav] notifications clicked');
});

// --- Ticker ---
const tickerItems = [
  { label: 'Live games',        value: '1,847,392',   type: 'value'  },
  { label: 'Hottest champ',     value: 'Briar · 58% WR', type: 'accent' },
  { label: 'Current patch',     value: '14.24',       type: 'value'  },
  { label: 'Games tracked today', value: '23.4M',     type: 'value'  },
  { label: 'Top EUW player',    value: 'Faker · 97LP', type: 'value' },
  { label: 'Lowest WR',         value: 'Garen · 44.1%', type: 'value' },
  { label: 'Server',            value: 'Online',      type: 'accent' },
  { label: 'Top NA player',     value: 'Doublelift · 84LP', type: 'value' },
];

/*
 * Title: Ticker Item Builder
 * This utility function constructs the HTML string for a single ticker item.
 * It applies 'ta' (accent text) or 'tv' (value text) classes dynamically based on the item type.
 */
function buildTickerItem({ label, value, type }) {
  const cls = type === 'accent' ? 'ta' : 'tv';
  return `<span class="ticker-item"><span class="tl">${label}</span>&nbsp;<span class="${cls}">${value}</span></span>`;
}

/*
 * Title: Ticker Renderer
 * This function populates the live scrolling ticker on the page.
 * It duplicates the list of items when inserting them to create a seamless, infinite scrolling illusion.
 */
function renderTicker(items) {
  const html = items.map(buildTickerItem).join('');
  ticker.innerHTML = html + html; // duplicate set for seamless loop
}

renderTicker(tickerItems);

ticker.addEventListener('mouseenter', () => { ticker.style.animationPlayState = 'paused'; });
ticker.addEventListener('mouseleave', () => { ticker.style.animationPlayState = 'running'; });

// --- Feature cells entrance ---
/*
 * Title: Feature Cells Entrance Animation (Intersection Observer)
 * Sets up scroll-based animations for the feature highlights section.
 * It monitors when elements enter the viewport and triggers a staggered CSS fade-in
 * and slide-up animation.
 */
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