// models/Facility.js
const mongoose = require('mongoose');

const facilitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    location: { type: String },
    capacity: { type: Number, default: 6 },
    image: { type: String }
});

module.exports = mongoose.model('Facility', facilitySchema);