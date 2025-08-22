(function () {
  const apiBase = (location.origin.includes(':3000')) ? location.origin : 'http://localhost:3000';
  const sidKey = 'rolivia.sid'; const sid = localStorage.getItem(sidKey) || (Math.random().toString(36).slice(2) + Date.now().toString(36)); localStorage.setItem(sidKey, sid);
  fetch(`${apiBase}/api/visit?sid=${encodeURIComponent(sid)}`).catch(() => { });
  fetch(`${apiBase}/api/stats/summary`).then(r => r.json()).then(draw).catch(() => draw({ visitors: 0, orders: 0, reviews: 0, rating_avg: 5 }));
  function countUp(el, to, dur = 900) { const start = Number(el.textContent) || 0; const t0 = performance.now(); function step(now) { const p = Math.min(1, (now - t0) / dur); el.textContent = Math.round(start + (to - start) * p).toLocaleString('ar-EG'); if (p < 1) requestAnimationFrame(step); } requestAnimationFrame(step); }
  function draw(d) { const v = document.getElementById('m-visitors'), o = document.getElementById('m-orders'), r = document.getElementById('m-reviews'), rate = document.getElementById('m-rating'); if (v) countUp(v, d.visitors || 0); if (o) countUp(o, d.orders || 0); if (r) countUp(r, d.reviews || 0); if (rate) rate.textContent = (d.rating_avg || 5).toFixed(1); }
})();
