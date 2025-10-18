import React from 'react';
import { useLocation } from 'react-router-dom';

const ConfirmationPage = () => {
    const location = useLocation();
    const { bookingDetails } = location.state || {};

    if (!bookingDetails) {
        return <div>No booking details available.</div>;
    }

    return (
        <div className="confirmation-page">
            <h1>Booking Confirmation</h1>
            <p><strong>Event:</strong> {bookingDetails.eventName}</p>
            <p><strong>Seats Booked:</strong> {bookingDetails.seatsBooked}</p>
            <p><strong>Remaining Seats:</strong> {bookingDetails.remainingSeats}</p>
            <p><strong>Booking ID:</strong> {bookingDetails.bookingId}</p>
            <p><strong>Booking Time:</strong> {new Date(bookingDetails.bookingTime).toLocaleString()}</p>
        </div>
    );
};

export default ConfirmationPage;