const regionSelect = document.querySelector('.hs-region')
const ticker = document.getElementById('ticker')
const notifDot = document.querySelector('.notif-dot')
document.querySelector('.nav-notif').addEventListener('click', () => {
  // Later implement UI opening for notificatins.
})

// Ticker a new thing for me written by AI later i will implement a dynamic values that chnage
const tickerItems = [
  { label: 'Live games',        value: '1,847,392',   type: 'value'  },
  { label: 'Hottest champ',     value: 'Briar · 58% WR', type: 'accent' },
  { label: 'Current patch',     value: '14.24',       type: 'value'  },
  { label: 'Games tracked today', value: '23.4M',     type: 'value'  },
  { label: 'Top EUW player',    value: 'Faker · 97LP', type: 'value' },
  { label: 'Lowest WR',         value: 'Garen · 44.1%', type: 'value' },
  { label: 'Server',            value: 'Online',      type: 'accent' },
  { label: 'Top NA player',     value: 'Doublelift · 84LP', type: 'value' },
]

function buildTickerItem({ label, value, type }) {
  const cls = type === 'accent' ? 'ta' : 'tv'
  return `<span class="ticker-item"><span class="tl">${label}</span>&nbsp;<span class="${cls}">${value}</span></span>`
}

function renderTicker(items) {
  const html = items.map(buildTickerItem).join('')
  ticker.innerHTML = html + html
}
renderTicker(tickerItems)

ticker.addEventListener('mouseenter', () => { ticker.style.animationPlayState = 'paused' })
ticker.addEventListener('mouseleave', () => { ticker.style.animationPlayState = 'running' })

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (!entry.isIntersecting) return

    const el = entry.target

    el.style.transitionDelay = `${index * 0.1}s`
    el.classList.add('is-visible')

    observer.unobserve(el)
  })
}, { threshold: 0.2 })

let featureCell = document.querySelectorAll('.feature-cell')
featureCell.forEach(cell => observer.observe(cell))