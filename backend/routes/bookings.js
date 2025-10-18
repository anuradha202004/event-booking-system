const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController.js');

// Route to book seats for an event
router.post('/book', bookingController.bookSeats);

// Route to cancel a booking
router.delete('/cancel/:bookingId', bookingController.cancelBooking);

// Route to fetch user-specific bookings
router.get('/user/:userId', bookingController.getUserBookings);

module.exports = router;