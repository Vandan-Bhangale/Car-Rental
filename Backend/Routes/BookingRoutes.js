const express = require('express');
const router = express.Router();
const bookingController = require('../controller/BookingController');
const { model } = require('mongoose');

router.post('/bookings', bookingController.createBooking);
router.get('/mybookings', bookingController.getUserBookings);

module.exports = router;
