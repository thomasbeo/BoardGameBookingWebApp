const express = require("express");
const router = express.Router();
const Game = require("../models/Game");

// GET /api/games
router.get("/", async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: "Error fetching games" });
  }
});

module.exports = router;
