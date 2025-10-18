import React from 'react';
import EventList from '../components/EventList';

const HomePage = () => {
    return (
        <div>
            <h1>Welcome to the Event Booking System</h1>
            <p>Browse and book your favorite events!</p>
            <EventList />
        </div>
    );
};

export default HomePage;