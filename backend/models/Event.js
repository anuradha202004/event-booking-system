const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    totalSeats: {
        type: Number,
        required: true
    },
    bookedSeats: {
        type: Number,
        default: 0
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;