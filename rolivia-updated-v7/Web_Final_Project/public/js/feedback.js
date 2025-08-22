// Feedback approved-only view
const apiBase = (location.origin.includes(':3000')) ? location.origin : 'http://localhost:3000';
const feedbackForm = document.getElementById('feedbackForm'); const feedbackList = document.getElementById('feedbackList');
async function fetchApproved() { try { const res = await fetch(`${apiBase}/api/comments?approved=1`); const data = await res.json(); renderList(data); } catch (e) { console.error(e); } }
function renderList(items) {
    feedbackList.innerHTML = ''; if (!items.length) {
        const p = document.createElement('p'); p.className = 'muted';
        p.textContent = 'لا توجد تعليقات بعد — كن أول من يشارك تجربته!'; feedbackList.appendChild(p); return;
    } items.slice(0, 4).forEach(r => { const card = document.createElement('article'); card.className = 'card feedback-item'; const stars = '★'.repeat(r.rating || 5); card.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center;gap:8px"><strong>${r.name || 'مستخدم'}</strong><span class="muted">${stars}</span></div><p class="msg" style="margin:8px 0 0">${r.message}</p>`; feedbackList.appendChild(card); });
}
feedbackForm?.addEventListener('submit', async (e) => { e.preventDefault(); const form = new FormData(feedbackForm); const payload = { name: (form.get('name') || '').toString().trim() || 'مستخدم', message: (form.get('message') || '').toString().trim(), rating: Number(form.get('rating') || '5') }; if (!payload.message) return alert('اكتب تعليقك من فضلك'); const res = await fetch(`${apiBase}/api/comments`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }); if (res.ok) { feedbackForm.reset(); alert('شكرًا! سيتم نشر تعليقك بعد المراجعة.'); } else { alert('تعذّر إرسال التعليق.'); } });
fetchApproved();








// Auto-refresh approved feedback every 60s and when tab regains focus (added)
let __fbTimer = setInterval(fetchApproved, 60000);
document.addEventListener('visibilitychange', () => { if (!document.hidden) fetchApproved(); });
