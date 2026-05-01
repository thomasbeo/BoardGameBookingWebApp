// models/Reservation.js
const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    facility: { type: mongoose.Schema.Types.ObjectId, ref: 'Facility', required: true },
    game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
    date: { type: String, required: true }, // ISO date string yyyy-mm-dd
    timeSlot: { type: String, required: true },
    isCanceled: { type: Boolean, default: false },  
}, { timestamps: true });

// optional: compound index to prevent duplicate reservations by same user at same facility/time
reservationSchema.index({ facility: 1, date: 1, timeSlot: 1 }, { unique: false });

module.exports = mongoose.model('Reservation', reservationSchema);