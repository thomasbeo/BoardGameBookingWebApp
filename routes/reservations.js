const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth'); // <== το middleware
const {
  getReservations,
  createReservation,
  cancelReservation,
  getMyReservations,
  getCanceledReservations
} = require("../controllers/reservationController");

//Middleware για έλεγχο admin 
function adminOnly(req, res, next) {
  if(req.user.role !== "admin"){
    return res.status(403).json({ error: 'Access denied. Admins only.' });
  }
  next();
}

router.get("/", auth, getReservations);
router.post("/", auth, createReservation); 
router.get("/my", auth, getMyReservations);   
router.get('/canceled', auth, getCanceledReservations);

//μόνο για admin
router.patch("/:id/cancel", auth, adminOnly, cancelReservation);

module.exports = router;