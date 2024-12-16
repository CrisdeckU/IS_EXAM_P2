const express = require('express');
const { createReservation, getReservation, cancelReservation } = require('../controllers/reservations');
const router = express.Router();

router.post('/reservations', createReservation);
router.get('/reservations/:id', getReservation);
router.delete('/reservations/:id', cancelReservation);

module.exports = router;
