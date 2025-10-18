import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import apiClient from '../api/apiClient.js';

const BookingHistoryPage = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await apiClient.get(`/bookings/user/${user.id}`);
                setBookings(response.data);
            } catch (error) {
                console.error('Error fetching booking history:', error);
            }
        };

        if (user) {
            fetchBookings();
        }
    }, [user]);

    return (
        <div className="booking-history">
            <h1>Your Booking History</h1>
            {bookings.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
                <ul>
                    {bookings.map((booking) => (
                        <li key={booking.id}>
                            <h2>Event ID: {booking.eventId}</h2>
                            <p>Seats Booked: {booking.seatsBooked}</p>
                            <p>Booking Time: {new Date(booking.bookingTime).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default BookingHistoryPage;