const Booking = require('../models/Booking');
const Event = require('../models/Event');

// Function to book seats for an event
const bookSeats = async (userId, eventId, seatsBooked) => {
    const session = await Booking.startSession();
    session.startTransaction();
    try {
        const event = await Event.findById(eventId).session(session);
        if (!event) {
            throw new Error('Event not found');
        }

        if (event.bookedSeats + seatsBooked > event.totalSeats) {
            throw new Error('Not enough seats available');
        }

        // Update event's booked seats
        event.bookedSeats += seatsBooked;
        await event.save({ session });

        // Create a new booking
        const booking = new Booking({
            userId,
            eventId,
            seatsBooked,
            bookingTime: new Date(),
        });
        await booking.save({ session });

        await session.commitTransaction();
        session.endSession();
        return booking;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};

// Function to cancel a booking
const cancelBooking = async (bookingId) => {
    const session = await Booking.startSession();
    session.startTransaction();
    try {
        const booking = await Booking.findById(bookingId).session(session);
        if (!booking) {
            throw new Error('Booking not found');
        }

        const event = await Event.findById(booking.eventId).session(session);
        if (!event) {
            throw new Error('Event not found');
        }

        // Update event's booked seats
        event.bookedSeats -= booking.seatsBooked;
        await event.save({ session });

        // Delete the booking
        await Booking.findByIdAndDelete(bookingId).session(session);

        await session.commitTransaction();
        session.endSession();
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};

// Function to fetch user-specific bookings
const getUserBookings = async (userId) => {
    return await Booking.find({ userId }).populate('eventId');
};

module.exports = {
    bookSeats,
    cancelBooking,
    getUserBookings,
};