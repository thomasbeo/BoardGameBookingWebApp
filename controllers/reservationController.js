const Reservation = require("../models/Reservation");

//Get all reservations 
const getReservations = async (req, res) => {
  try {
    
    let filter = {};
    if (req.user.role !== "admin") {
      filter = { user: req.user._id };
    }

    const reservations = await Reservation.find(filter)
      .populate("facility")
      .populate("game")
      .populate("user", "username email")
      .sort({ date: 1 });

    res.json(reservations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch reservations" });
  }
};

// Get my reservations (μόνο του συνδεδεμένου χρήστη)
const getMyReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.user._id })
      .populate("facility")
      .populate("game")
      .populate("user", "username email")
      .sort({ date: 1 });
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch my reservations" });
  }
};

//Post create reservation
const createReservation = async (req, res) => {
    try {
        const userId = req.user._id;
        const { facility, game, date, timeSlot } = req.body;

        if (!facility || !game || !date || !timeSlot) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // έλεγχος για διπλή κράτηση στην ίδια εγκατάσταση/ώρα/ημέρα
        const existing = await Reservation.findOne({
            facility,
            date,
            timeSlot,
            isCanceled: false
        });

        if (existing) {
          return res.status(400).json({ error: 'Αυτό το slot έχει ήδη κρατηθεί από άλλο χρήστη.' });
        }

        // check if same user έχει κάνει την ίδια κράτηση (double booking)
        const duplicateUserBooking = await Reservation.findOne({
          user: userId,
          facility,
          date,
          timeSlot,
          isCanceled: false
        });

        if (duplicateUserBooking) {
          return res.status(400).json({
            error: "Έχεις ήδη κάνει κράτηση σε αυτό το slot"
          });
        }

        const reservation = new Reservation({ 
            user: userId,
            facility, 
            game, 
            date, 
            timeSlot });
        await reservation.save();
        res.status(201).json(reservation);
  } catch (err) {
        res.status(400).json({ error: "Failed to create reservation" });
  }
};

// DELETE cancel reservation
const cancelReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    if (reservation.isCanceled) {
      return res.status(400).json({ error: "Reservation already canceled" });
    }

    reservation.isCanceled = true;
    await reservation.save();

    res.json({ message: "Reservation canceled successfully" });
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to cancel reservation" });
  }
};

const getCanceledReservations = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const reservations = await Reservation.find({ isCanceled: true })
    .populate('facility')
    .populate('game')
    .populate('user', 'username email')
    .sort({ updatedAt: -1 });

  res.json(reservations);
};

module.exports = {
  getReservations,
  getMyReservations,
  getCanceledReservations,
  createReservation,
  cancelReservation
};