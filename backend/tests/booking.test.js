const request = require('supertest');
const app = require('../server'); // Adjust the path as necessary
const mongoose = require('mongoose');
const Booking = require('../models/Booking');
const Event = require('../models/Event');

describe('Booking API', () => {
    let eventId;

    beforeAll(async () => {
        // Connect to the test database
        await mongoose.connect(process.env.TEST_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

        // Seed an event for testing
        const event = new Event({
            name: 'Test Event',
            date: new Date(),
            totalSeats: 100,
            bookedSeats: 0,
            location: 'Test Location',
            description: 'Test Description'
        });
        const savedEvent = await event.save();
        eventId = savedEvent._id;
    });

    afterAll(async () => {
        // Clean up the database
        await Booking.deleteMany({});
        await Event.deleteMany({});
        await mongoose.connection.close();
    });

    it('should book seats for an event', async () => {
        const response = await request(app)
            .post('/api/bookings')
            .send({
                userId: 'user123',
                eventId: eventId,
                seatsBooked: 3
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.seatsBooked).toBe(3);

        const updatedEvent = await Event.findById(eventId);
        expect(updatedEvent.bookedSeats).toBe(3);
    });

    it('should prevent overbooking', async () => {
        await request(app)
            .post('/api/bookings')
            .send({
                userId: 'user456',
                eventId: eventId,
                seatsBooked: 98
            });

        const response = await request(app)
            .post('/api/bookings')
            .send({
                userId: 'user789',
                eventId: eventId,
                seatsBooked: 1
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Not enough seats available');
    });

    it('should fetch user-specific bookings', async () => {
        const response = await request(app)
            .get('/api/bookings/user123');

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBe(1);
    });

    it('should cancel a booking', async () => {
        const booking = await Booking.findOne({ userId: 'user123' });
        const response = await request(app)
            .delete(`/api/bookings/${booking.id}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Booking cancelled successfully');

        const updatedEvent = await Event.findById(eventId);
        expect(updatedEvent.bookedSeats).toBe(0);
    });
});