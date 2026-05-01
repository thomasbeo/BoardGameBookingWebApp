document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Μη εξουσιοδοτημένη πρόσβαση');
    return location.href = '/login.html';
  }

  const res = await fetch('/api/reservations/canceled', {
    headers: { Authorization: 'Bearer ' + token }
  });

  const data = await res.json();
  const list = document.getElementById('canceledList');

  if (!data.length) {
    list.innerHTML = '<p class="text-center text-muted">Δεν υπάρχουν ακυρωμένες κρατήσεις.</p>';
    return;
  }

  data.forEach(r => {
    list.innerHTML += `
      <div class="col-md-4">
        <div class="card border-danger shadow-sm">
          <div class="card-body">
            <h5>${r.facility?.name}</h5>
            <p>Game: ${r.game?.title}</p>
            <p>User: ${r.user?.username}</p>
            <p>Date: ${r.date}</p>
            <p>Time: ${r.timeSlot}</p>
            <span class="badge bg-danger">Ακυρωμένη</span>
          </div>
        </div>
      </div>
    `;
  });
});