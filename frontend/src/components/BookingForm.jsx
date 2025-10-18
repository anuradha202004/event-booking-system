import React, { useState } from 'react';

const BookingForm = ({ event, onBooking }) => {
    const [seatsBooked, setSeatsBooked] = useState(1);
    const [error, setError] = useState('');

    const handleBooking = async (e) => {
        e.preventDefault();
        setError('');

        if (seatsBooked < 1 || seatsBooked > event.totalSeats - event.bookedSeats) {
            setError('Invalid number of seats selected.');
            return;
        }

        try {
            const response = await fetch(`/api/bookings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    eventId: event.id,
                    seatsBooked,
                }),
            });

            if (!response.ok) {
                throw new Error('Booking failed. Please try again.');
            }

            const bookingConfirmation = await response.json();
            onBooking(bookingConfirmation);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h2>Book Seats for {event.name}</h2>
            <form onSubmit={handleBooking}>
                <div>
                    <label htmlFor="seats">Number of Seats:</label>
                    <input
                        type="number"
                        id="seats"
                        value={seatsBooked}
                        onChange={(e) => setSeatsBooked(Number(e.target.value))}
                        min="1"
                        max={event.totalSeats - event.bookedSeats}
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Book Now</button>
            </form>
        </div>
    );
};

export default BookingForm;