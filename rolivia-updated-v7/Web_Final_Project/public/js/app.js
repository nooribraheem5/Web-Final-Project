const CONFIG = { WHATSAPP: '972598927872', DEFAULT_CURRENCY: 'ILS', RATE: 3.4, FEES: { gaza: 8, outside: 15 } };
const $ = (s, r = document) => r.querySelector(s); const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
$('#year')?.textContent = new Date().getFullYear();
// Currency switcher: updates localStorage and re-renders prices (added comment)
$('#currencySelect')?.addEventListener('change', e => { localStorage.setItem('currency', e.target.value); updatePrices(); });
function fmt(ils, c = localStorage.getItem('currency') || CONFIG.DEFAULT_CURRENCY) { if (c === 'USD') return `$ ${(ils / CONFIG.RATE).toFixed(2)}`; return `₪ ${Number(ils).toFixed(2)}`; }
function setupArrows(box) { const prev = $('.hs-btn.prev', box.parentElement); const next = $('.hs-btn.next', box.parentElement); const step = (px) => box.scrollBy({ left: px, behavior: 'smooth' }); prev?.addEventListener('click', () => step(box.clientWidth * 0.8)); next?.addEventListener('click', () => step(-box.clientWidth * 0.8)); }
(function renderProducts() { const box = $('#productsHBox'); if (!box) return; setupArrows(box); updatePrices(); })();
(function benefits() { const grid = $('#benefitsGrid'); if (!grid) return; const lb = document.getElementById('lightbox') || (() => { const el = document.createElement('div'); el.id = 'lightbox'; el.className = 'lightbox'; el.innerHTML = '<button class="lb-close" aria-label="إغلاق">×</button><img alt="">'; document.body.appendChild(el); return el; })(); const img = lb.querySelector('img'); const btn = lb.querySelector('button'); window.openLightbox = (src, alt) => { img.src = src; img.alt = alt || ''; lb.classList.add('show'); }; function close() { lb.classList.remove('show'); } btn.addEventListener('click', close); lb.addEventListener('click', e => { if (e.target === lb) close(); }); document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); }); })();
function updatePrices() {
  $$('#productsHBox .pcard').forEach(card => { const ils = parseFloat(card.dataset.priceIls || ''); if (!isNaN(ils)) { const span = card.querySelector('.pcard-meta span'); if (span) span.textContent = `السعر: ${fmt(ils)}`; } }); $$('.fee').forEach(el => { const ils = parseFloat(el.dataset.feeIls || '0'); el.textContent = fmt(ils); });
}
updatePrices();

// --- Reviews System ---
async function loadApprovedReviews(page = 1) {
  const res = await fetch('reviews.json?' + Date.now());
  const reviews = await res.json();
  const approved = reviews.filter(r => r.status === 'approved');
  const perPage = 4;
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const slice = approved.slice(start, end);
  const list = document.getElementById('reviews-list');
  if (list) {
    list.innerHTML = '';
    slice.forEach(r => {
      const li = document.createElement('div');
      li.className = 'review-item';
      li.innerHTML = `<b>${r.name}</b> ★${r.rating}<br>${r.comment}`;
      list.appendChild(li);
    });
    const pag = document.getElementById('reviews-pagination');
    if (pag) {
      pag.innerHTML = '';
      const pages = Math.ceil(approved.length / perPage);
      for (let i = 1; i <= pages; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.onclick = () => loadApprovedReviews(i);
        pag.appendChild(btn);
      }
    }
  }
}

async function submitReview(ev) {
  ev.preventDefault();
  const name = document.getElementById('review-name').value;
  const rating = document.getElementById('review-rating').value;
  const comment = document.getElementById('review-comment').value;
  const res = await fetch('reviews.json');
  let reviews = await res.json();
  reviews.push({ name, rating, comment, status: 'pending' });
  await fetch('save_review', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reviews)
  });
  alert('تم إرسال رأيك بانتظار موافقة الإدارة.');
}

setInterval(loadApprovedReviews, 60000);
document.addEventListener('DOMContentLoaded', () => {
  loadApprovedReviews();
  const form = document.getElementById('review-form');
  if (form) form.addEventListener('submit', submitReview);
});
// --- End Reviews System ---
