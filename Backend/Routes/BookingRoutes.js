const express = require('express');
const router = express.Router();
const bookingController = require('../controller/BookingController');

router.post('/bookings', bookingController.createBooking);
router.get('/mybookings', bookingController.getUserBookings);
router.delete('/cancelbooking/:bookingId', bookingController.cancelBooking);
router.get('/bookingCount', bookingController.getBookingCount);
router.get('/totalRevenue', bookingController.getTotalRevenue);
router.get('/totalBookings', bookingController.getBookingDetails);
router.post('/payment', bookingController.payment);

module.exports = router;
