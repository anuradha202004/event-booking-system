// ...existing code...
const Event = require('../models/Event.js');

async function getAllEvents(req, res) {
    try {
        const events = await Event.find({});
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching events', error });
    }
}

async function getEventById(req, res) {
    try {
        const { id } = req.params;
        const event = await Event.findById(id);
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching event', error });
    }
}

async function checkSeatAvailability(req, res) {
    const { eventId } = req.params;
    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        const availableSeats = event.totalSeats - event.bookedSeats;
        res.status(200).json({ availableSeats });
    } catch (error) {
        res.status(500).json({ message: 'Error checking seat availability', error });
    }
}

module.exports = {
    getAllEvents,
    getEventById,
    checkSeatAvailability
};
// ...existing code...