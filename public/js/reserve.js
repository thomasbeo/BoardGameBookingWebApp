// public/js/reserve.js
function qs(selector) { return document.querySelector(selector); }
function getQueryParam(name) { return new URLSearchParams(location.search).get(name); }

async function fetchJSON(url, opts = {}) {
  const res = await fetch(url, opts);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || 'Request failed with status ' + res.status);
  }
  return res.json();
}

async function loadGames() {
  try {
    const games = await fetchJSON('/api/games');
    const sel = qs('#gameSelect');
    sel.innerHTML = '<option value="">(No specific game)</option>' + games.map(g => `<option value="${g._id}">${g.title}</option>`).join('');
  } catch (err) {
    console.warn('Could not load games', err);
  }
}

async function loadAvailability() {
  const facilityId = getQueryParam('facility');
  const date = qs('#date').value;
  if (!facilityId || !date) return;
  try {
    const json = await fetchJSON(`/api/facilities/${facilityId}/availability?date=${date}`);
    const slotsDiv = qs('#slots');
    slotsDiv.innerHTML = json.slots.map(s => `
      <div class="form-check">
        <input class="form-check-input" type="radio" name="slot" id="slot-${s.slot}" value="${s.slot}" ${s.taken ? 'disabled' : ''}>
        <label class="form-check-label" for="slot-${s.slot}">${s.slot} ${s.taken ? '(Taken)' : ''}</label>
      </div>
    `).join('');
  } catch (err) {
    qs('#slots').innerHTML = `<div class="text-danger">${err.message}</div>`;
  }
}

async function makeReservation() {
  const facilityId = getQueryParam('facility');
  const date = qs('#date').value;
  const slotEl = document.querySelector('input[name="slot"]:checked');
  const gameId = qs('#gameSelect').value || null;

  if (!facilityId || !date || !slotEl) {
    return alert('Select a date and a time slot');
  }

  const token = localStorage.getItem('token');
  if (!token) return alert('Please log in first');

  try {
    const body = { facilityId, gameId, date, timeSlot: slotEl.value };
    const res = await fetch('/api/reservations', {
      method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token }, body: JSON.stringify(body)
    });
    const json = await res.json();
    if (!res.ok) return alert(json.message || 'Could not create reservation');
    alert('Reservation created!');
    location.href = '/';
  } catch (err) {
    alert('Error: ' + err.message);
  }
}

(async function () {
  const q = getQueryParam('facility');
  if (!q) {
    document.getElementById('message').innerHTML = '<div class="alert alert-warning">No facility selected. Go back and pick a facility.</div>';
    return;
  }

  await loadGames();

  qs('#date').addEventListener('change', loadAvailability);
  qs('#reserveBtn').addEventListener('click', makeReservation);
})();