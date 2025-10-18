import React from 'react';

const EventCard = ({ event, onBook }) => {
    const { id, name, date, totalSeats, bookedSeats, location, description } = event;

    const handleBooking = () => {
        onBook(id);
    };

    const availableSeats = totalSeats - bookedSeats;

    return (
        <div className="event-card">
            <h3>{name}</h3>
            <p>{description}</p>
            <p>Date: {new Date(date).toLocaleDateString()}</p>
            <p>Location: {location}</p>
            <p>Available Seats: {availableSeats}</p>
            <button onClick={handleBooking} disabled={availableSeats <= 0}>
                {availableSeats > 0 ? 'Book Now' : 'Sold Out'}
            </button>
        </div>
    );
};

export default EventCard;