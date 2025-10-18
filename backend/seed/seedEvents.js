const mongoose = require('mongoose');
const Event = require('../models/Event');

const seedEvents = async () => {
    const events = [
        {
            name: 'Music Concert',
            date: new Date('2023-12-01T19:00:00Z'),
            totalSeats: 100,
            bookedSeats: 0,
            location: 'City Arena',
            description: 'An exciting music concert featuring various artists.'
        },
        {
            name: 'Art Exhibition',
            date: new Date('2023-12-10T10:00:00Z'),
            totalSeats: 50,
            bookedSeats: 0,
            location: 'Art Gallery',
            description: 'Explore the latest art pieces from local artists.'
        },
        {
            name: 'Tech Conference',
            date: new Date('2023-12-15T09:00:00Z'),
            totalSeats: 200,
            bookedSeats: 0,
            location: 'Convention Center',
            description: 'Join industry leaders for a day of tech talks and networking.'
        },
        {
            name: 'Food Festival',
            date: new Date('2023-12-20T12:00:00Z'),
            totalSeats: 150,
            bookedSeats: 0,
            location: 'Downtown Park',
            description: 'Taste delicious food from various vendors and chefs.'
        }
    ];

    try {
        await Event.deleteMany(); // Clear existing events
        await Event.insertMany(events); // Seed new events
        console.log('Events seeded successfully!');
    } catch (error) {
        console.error('Error seeding events:', error);
    }
};

module.exports = seedEvents;