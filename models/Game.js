// models/Game.js
const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    title: { type: String, required: true },
    minPlayers: { type: Number, default: 1 },
    maxPlayers: { type: Number, default: 4 },
    durationMin: { type: Number, default: 60 }, // minutes
    image: { type: String }, // URL or base64 later
    description: { type: String }
});

module.exports = mongoose.model('Game', gameSchema);