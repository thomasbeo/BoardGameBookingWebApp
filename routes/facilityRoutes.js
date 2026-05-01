const express = require("express");
const { getFacilities, createFacility } = require("../controllers/facilityController");

const router = express.Router();

router.get("/", getFacilities);
router.post("/", createFacility);

module.exports = router;