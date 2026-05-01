const express = require("express");
const router = express.Router();
const Facility = require("../models/Facility");

// GET /api/facilities
router.get("/", async (req, res) => {
  try {
    const facilities = await Facility.find();
    res.json(facilities);
  } catch (err) {
    res.status(500).json({ message: "Error fetching facilities" });
  }
});

module.exports = router;
