const Facility = require("../models/Facility");

// GET all facilities
exports.getFacilities = async (req, res) => {
  try {
    const facilities = await Facility.find();
    res.json(facilities);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch facilities" });
  }
};

// POST create facility
exports.createFacility = async (req, res) => {
  try {
    const facility = new Facility(req.body);
    await facility.save();
    res.status(201).json(facility);
  } catch (err) {
    res.status(400).json({ error: "Failed to create facility" });
  }
};