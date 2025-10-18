const Booking = require('../models/Booking.js');
const Event = require('../models/Event.js');

// Book seats for an event
exports.bookSeats = async (req, res) => {
    const { userId, eventId, seatsBooked } = req.body;

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        if (event.bookedSeats + seatsBooked > event.totalSeats) {
            return res.status(400).json({ message: 'Not enough seats available' });
        }

        const booking = new Booking({
            userId,
            eventId,
            seatsBooked,
            bookingTime: new Date(),
        });

        await booking.save();
        event.bookedSeats += seatsBooked;
        await event.save();

        res.status(201).json({ message: 'Booking successful', booking });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Cancel a booking
exports.cancelBooking = async (req, res) => {
    const { bookingId } = req.params;

    try {
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        const event = await Event.findById(booking.eventId);
        event.bookedSeats -= booking.seatsBooked;
        await event.save();

        await Booking.findByIdAndDelete(bookingId);
        res.status(200).json({ message: 'Booking canceled successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Fetch user-specific bookings
exports.getUserBookings = async (req, res) => {
    const { userId } = req.params;

    try {
        const bookings = await Booking.find({ userId }).populate('eventId');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};