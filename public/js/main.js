document.addEventListener('DOMContentLoaded', () => {
  let selectedFacilityId = null; // ποια εγκατάσταση επέλεξε ο χρήστης
  let currentUserRole = null;

  // -------------------------------------------------------
  // Elements
  // -------------------------------------------------------
  const reserveModal = new bootstrap.Modal(document.getElementById('reservationModal'));
  const facilitySelect = document.querySelector('#reservationModal select[name="facility"]');
  const dateInput = document.querySelector('#reservationModal input[name="date"]');
  const timeSlotSelect = document.querySelector('#reservationModal select[name="timeSlot"]');
  const form = document.getElementById('reservationForm');
  const today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);
  
  // -------------------------------------------------------
  // Load facilities & render cards
  // -------------------------------------------------------
  async function loadFacilities() {
    try {
      const res = await fetch('/api/facilities');
      if (!res.ok) throw new Error('Facilities fetch failed');
      const facilities = await res.json();

      // render cards
      const container = document.getElementById('facilities');
      container.innerHTML = '';
      facilities.forEach(f => {
        container.innerHTML += `
          <div class="col-md-4">
            <div class="card h-100 shadow-sm">
              <img src="${f.image || '/images/facility-placeholder.jpg'}" class="card-img-top" alt="${f.name}">
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">${f.name}</h5>
                <p class="card-text">${f.description || ''}</p>
                <button class="btn btn-warning mt-auto book-now-btn" data-id="${f._id}">Book Now</button>
              </div>
            </div>
          </div>
        `;
      });

      // event listeners Book Now
      document.querySelectorAll('.book-now-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          selectedFacilityId = btn.getAttribute('data-id'); // αποθηκεύουμε facility
          alert('Επιλέξατε εγκατάσταση. Τώρα πατήστε Play Now για να συνεχίσετε.');
        });
      });
    } catch (err) {
      console.error('Error loading facilities:', err);
    }
  }

  // -------------------------------------------------------
  // Load games & render cards
  // -------------------------------------------------------
  async function loadGames() {
    try {
      const res = await fetch('/api/games');
      if (!res.ok) throw new Error('Games fetch failed');
      const games = await res.json();

      // render cards
      const container = document.getElementById('games');
      container.innerHTML = '';
      games.forEach(g => {
        container.innerHTML += `
          <div class="col-md-4">
            <div class="card h-100 shadow-sm">
              <img src="${g.image || '/images/game-placeholder.jpg'}" class="card-img-top" alt="${g.title}">
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">${g.title}</h5>
                <p class="card-text">${g.description || ''}</p>
                <button class="btn btn-success mt-auto play-now-btn" data-id="${g._id}">Play Now</button>
              </div>
            </div>
          </div>
        `;
      });

      // event listeners Play Now
      document.querySelectorAll('.play-now-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const gameId = btn.getAttribute('data-id');
          openReservationModal(gameId);
        });
      });
    } catch (err) {
      console.error('Error loading games:', err);
    }
  }

  // -------------------------------------------------------
  // Open reservation modal
  // -------------------------------------------------------
  function openReservationModal(gameId) {
    form.reset();
    form.dataset.gameid = gameId;

    // load facilities in select
    fetch('/api/facilities')
      .then(res => res.json())
      .then(facilities => {
        facilitySelect.innerHTML = '';
        facilities.forEach(f => {
          const option = document.createElement('option');
          option.value = f._id;
          option.textContent = f.name;
          if (selectedFacilityId && selectedFacilityId === f._id) {
            option.selected = true;
          }
          facilitySelect.appendChild(option);
        });
      });

    reserveModal.show();
  }

  // -------------------------------------------------------
  // Load my reservations
  // -------------------------------------------------------
  async function loadMyReservations() {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Πρέπει να κάνεις login για να δεις τις κρατήσεις σου.");
      location.href = "/login.html";
      return;
    }

    const section = document.getElementById('reservationsSection');
    const list = document.getElementById('reservationsList');
    section.style.display = 'block';
    list.innerHTML = '<p>Φόρτωση...</p>';

    try {
      const res = await fetch('/api/reservations/my', {
        headers: { 'Authorization': 'Bearer ' + token }
      });
      const data = await res.json();

      if (!res.ok) {
        list.innerHTML = `<p class="text-danger">${data.error || "Αποτυχία φόρτωσης"}</p>`;
        return;
      }

      if (!data.length) {
        list.innerHTML = '<p class="text-muted">Δεν έχεις καμία κράτηση.</p>';
        return;
      }

      list.innerHTML = '';
      data.forEach(r => {
        list.innerHTML += `
          <div class="col-md-4">
            <div class="card h-100 shadow-sm">
              <div class="card-body">
                <h5 class="card-title">Facility: ${r.facility?.name || '-'}</h5>
                <p class="card-text">Game: ${r.game?.title || '-'}</p>
                <p class="card-text">Date: ${r.date}</p>
                <p class="card-text">Time: ${r.timeSlot}</p>
                <p class="card-text"><i class="bi bi-person-circle me-1"></i>${r.user?.username || '-'}</p>
                <span class="badge ${r.isCanceled ? 'bg-danger' : 'bg-success'}">
                  ${r.isCanceled ? 'Ακυρώθηκε' : 'Ενεργή'}
                </span>
              </div>
            </div>
          </div>
        `;
      });
    } catch (err) {
      list.innerHTML = `<p class="text-danger">Σφάλμα: ${err.message}</p>`;
    }
  }

  // -------------------------------------------------------
  // Load all reservations (μόνο για admin)
  // -------------------------------------------------------
  async function loadAllReservations() {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Πρέπει να κάνεις login για να δεις τις κρατήσεις.");
      location.href = "/login.html";
      return;
    }

    const section = document.getElementById('reservationsSection');
    const list = document.getElementById('reservationsList');
    section.style.display = 'block';
    list.innerHTML = '<p>Φόρτωση...</p>';

    try {
      const res = await fetch('/api/reservations', {
        headers: { 'Authorization': 'Bearer ' + token }
      });
      const data = await res.json();

      if (!res.ok) {
        list.innerHTML = `<p class="text-danger">${data.error || "Αποτυχία φόρτωσης"}</p>`;
        return;
      }

      if (!data.length) {
        list.innerHTML = '<p class="text-muted">Δεν υπάρχουν κρατήσεις.</p>';
        return;
      }

      list.innerHTML = '';
      data.forEach(r => {
        list.innerHTML += `
          <div class="col-md-4">
            <div class="card h-100 shadow-sm">
              <div class="card-body">
                <h5>Facility: ${r.facility?.name}</h5>
                <p>Game: ${r.game?.title}</p>
                <p>User: ${r.user?.username}</p>
                <p>Date: ${r.date}</p>
                <p>Time: ${r.timeSlot}</p>

                <span class="badge ${r.isCanceled ? 'bg-danger' : 'bg-success'}">
                  ${r.isCanceled ? 'Ακυρώθηκε' : 'Ενεργή'}
                </span>

                ${!r.isCanceled ? `
                  <button class="btn btn-sm btn-danger mt-2 cancel-btn"
                    data-id="${r._id}">
                    Ακύρωση
                  </button>
                ` : ''}
              </div>
            </div>
          </div>
        `;
      });

      document.querySelectorAll('.cancel-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
          if (!confirm('Σίγουρα θέλεις να ακυρώσεις την κράτηση;')) return;

          const token = localStorage.getItem('token');
          const id = btn.dataset.id;

          const res = await fetch(`/api/reservations/${id}/cancel`, {
            method: 'PATCH',
            headers: { Authorization: 'Bearer ' + token }
          });

          if (res.ok) {
            alert('Η κράτηση ακυρώθηκε');
            loadAllReservations(); // refresh
          } else {
            alert('Αποτυχία ακύρωσης');
          }
        });
      });
    } catch (err) {
      list.innerHTML = `<p class="text-danger">Σφάλμα: ${err.message}</p>`;
    }
  }

  let showingAllReservations = false;

  // event listener στο κουμπί "Κρατήσεις"
  document.getElementById('reservationsBtn').addEventListener('click', async e => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert("Πρέπει να κάνεις login.");
      return;
    }

    const res = await fetch('/api/auth/me', {
      headers: { 'Authorization': 'Bearer ' + token }
    });
    const user = await res.json();

    const section = document.getElementById("reservationsSection");
    const list = document.getElementById("reservationsList");

    if(showingAllReservations){
      section.style.display = "none";
      list.innerHTML = '';
      showingAllReservations = false;
      document.getElementById("reservationsBtn").textContent = "Όλες οι Κρατήσεις";
      return ;
    }

    // Αν είναι admin -> φέρνει όλες
    if (user.role === 'admin') {
      loadAllReservations();
    } else {
      loadMyReservations();
    }

    showingAllReservations = true;
    document.getElementById("reservationsBtn").textContent = "Απόκρυψη Κρατήσεων";
  });

  // -------------------------------------------------------
  // Submit reservation
  // -------------------------------------------------------
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Πρέπει να κάνεις login για να κάνεις κράτηση.');
      location.href = '/login.html';
      return;
    }

    const facility = facilitySelect.value;
    const game = form.dataset.gameid;
    const date = dateInput.value;
    const timeSlot = timeSlotSelect.value;

    if (!facility || !game || !date || !timeSlot) {
      alert('Συμπλήρωσε όλα τα πεδία');
      return;
    }

    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ facility, game, date, timeSlot })
      });
      const json = await res.json();
      if (!res.ok) {
        alert(json.error || 'Αποτυχία δημιουργίας κράτησης');
        return;
      }

      alert('Η κράτηση δημιουργήθηκε με επιτυχία!');
      reserveModal.hide();
    } catch (err) {
      alert('Σφάλμα: ' + err.message);
    }
  });

  // -------------------------------------------------------
  // Έλεγχος ρόλου χρήστη (για εμφάνιση "Κρατήσεις" κουμπιού)
  // -------------------------------------------------------
  async function checkAdminMenu() {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await fetch('/api/auth/me', {
        headers: { Authorization: 'Bearer ' + token }
      });

      if (!res.ok) return;

      const user = await res.json();
      currentUserRole = user.role;

      const reservationsBtn = document.getElementById('reservationsBtn');
      const reservationsLi = reservationsBtn.closest('li');
      const title = document.getElementById('reservationsTitle');
      const canceledLi = document.getElementById('canceledReservationsLi');

      // Εμφάνιση κουμπιού "Κρατήσεις"
      reservationsLi.style.display = 'block';

      if (user.role === 'admin') {
        reservationsBtn.textContent = 'Όλες οι κρατήσεις';
        title.textContent = '📅 Όλες οι Κρατήσεις';
        canceledLi.style.display = 'block';
      } else {
        reservationsBtn.textContent = 'Οι κρατήσεις μου';
        title.textContent = '📅 Οι Κρατήσεις μου';
        canceledLi.style.display = 'none';
      }
    } catch (err) {
      console.error('Error checking role:', err);
    }
  }

  // -------------------------------------------------------
  // Init
  // -------------------------------------------------------
  loadFacilities();
  loadGames();
  checkAdminMenu();
});