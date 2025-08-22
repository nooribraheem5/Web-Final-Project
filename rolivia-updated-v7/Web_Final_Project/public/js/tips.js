// Main tips slider
(function () {
  const wrap = document.querySelector('#tips .ig-series'); if (!wrap) return;
  const vp = wrap.querySelector('.ig-viewport'), track = wrap.querySelector('.ig-track');
  const slides = [...track.children]; const prev = wrap.querySelector('.ig-prev'), next = wrap.querySelector('.ig-next'), dots = wrap.querySelector('.ig-dots');
  let i = 0, sx = 0, dx = 0, drag = false;
  slides.forEach((_, k) => { const b = document.createElement('button'); b.type = 'button'; b.className = 'ig-dot' + (k === 0 ? ' active' : ''); b.onclick = () => go(k); dots.appendChild(b); });
  function w() { return vp.clientWidth }
  function set(px) { track.style.transform = `translateX(${px}px)`; }
  function go(k) { i = (k + slides.length) % slides.length; set(-i * w()); dots.querySelectorAll('.ig-dot').forEach((d, n) => d.classList.toggle('active', n === i)); }
  prev.onclick = () => go(i + 1); next.onclick = () => go(i - 1);
  function start(e) { drag = true; sx = (e.touches ? e.touches[0].clientX : e.clientX); dx = 0; vp.classList.add('drag'); }
  function move(e) { if (!drag) return; const x = (e.touches ? e.touches[0].clientX : e.clientX); dx = x - sx; set((-i * w()) + dx); }
  function end() { if (!drag) return; vp.classList.remove('drag'); drag = false; if (Math.abs(dx) > w() * 0.15) { go(i + (dx > 0 ? -1 : 1)); } else { go(i); } }
  vp.addEventListener('mousedown', start); vp.addEventListener('mousemove', move); window.addEventListener('mouseup', end);
  vp.addEventListener('touchstart', start, { passive: true }); vp.addEventListener('touchmove', move, { passive: true }); vp.addEventListener('touchend', end);
  window.addEventListener('resize', () => set(-i * w()));
  go(0);
})();

// Side tip-cards carousel with arrows
(function () {
  const car = document.querySelector('#tips .tips-carousel'); if (!car) return;
  const vp = car.querySelector('.carousel-viewport');
  const track = car.querySelector('.carousel-track');
  const slides = [...track.children];
  const prev = car.querySelector('.c-prev'), next = car.querySelector('.c-next'), dots = car.querySelector('.c-dots');
  let i = 0, sx = 0, dx = 0, drag = false;
  slides.forEach((_, k) => { const b = document.createElement('button'); b.type = 'button'; b.className = 'c-dot' + (k === 0 ? ' active' : ''); b.onclick = () => go(k); dots.appendChild(b); });
  function w() { return vp.clientWidth }
  function set(px) { track.style.transform = `translateX(${px}px)`; }
  function go(k) { i = (k + slides.length) % slides.length; set(-i * w()); dots.querySelectorAll('.c-dot').forEach((d, n) => d.classList.toggle('active', n === i)); }
  prev.onclick = () => go(i + 1); next.onclick = () => go(i - 1);
  function start(e) { drag = true; sx = (e.touches ? e.touches[0].clientX : e.clientX); dx = 0; vp.classList.add('drag'); }
  function move(e) { if (!drag) return; const x = (e.touches ? e.touches[0].clientX : e.clientX); dx = x - sx; set((-i * w()) + dx); }
  function end() { if (!drag) return; vp.classList.remove('drag'); drag = false; if (Math.abs(dx) > w() * 0.15) { go(i + (dx > 0 ? -1 : 1)); } else { go(i); } }
  vp.addEventListener('mousedown', start); vp.addEventListener('mousemove', move); window.addEventListener('mouseup', end);
  vp.addEventListener('touchstart', start, { passive: true }); vp.addEventListener('touchmove', move, { passive: true }); vp.addEventListener('touchend', end);
  window.addEventListener('resize', () => set(-i * w()));
  go(0);
})();
