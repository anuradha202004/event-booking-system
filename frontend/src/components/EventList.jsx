import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventCard from './EventCard';

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('/api/events');
                setEvents(response.data);
            } catch (err) {
                setError('Failed to fetch events');
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) {
        return <div>Loading events...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="event-list">
            {events.map(event => (
                <EventCard key={event.id} event={event} />
            ))}
        </div>
    );
};

export default EventList;