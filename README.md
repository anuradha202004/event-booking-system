# MERN Event Booking System

## Overview
This project is a full-stack MERN (MongoDB, Express, React, Node.js) application that allows users to browse events, check seat availability, and book tickets in real time. The system prevents overbooking and handles multiple users, providing booking confirmations.


## Features
- View upcoming events with seat availability
- Book seats for an event
- Cancel a booking
- Fetch user-specific bookings
- Real-time updates on seat availability (optional)
- Booking confirmation messages

## Project Structure
```
mern-event-booking
├── backend
│   ├── package.json
│   ├── .env.example
│   ├── server.js
│   ├── config
│   │   └── db.js
│   ├── models
│   │   ├── Event.js
│   │   └── Booking.js
│   ├── controllers
│   │   ├── eventController.js
│   │   └── bookingController.js
│   ├── routes
│   │   ├── events.js
│   │   └── bookings.js
│   ├── services
│   │   └── bookingService.js
│   ├── seed
│   │   └── seedEvents.js
│   └── tests
│       └── booking.test.js
├── frontend
│   ├── package.json
│   ├── public
│   │   └── index.html
│   └── src
│       ├── index.js
│       ├── App.js
│       ├── api
│       │   └── apiClient.js
│       ├── components
│       │   ├── EventList.jsx
│       │   ├── EventCard.jsx
│       │   ├── BookingForm.jsx
│       │   └── ConfirmationPage.jsx
│       ├── pages
│       │   ├── HomePage.jsx
│       │   └── BookingHistoryPage.jsx
│       ├── context
│       │   └── AuthContext.jsx
│       ├── hooks
│       │   └── useSocket.js
│       └── styles
│           └── main.css
├── .gitignore
└── README.md
```

## Setup Instructions

### Backend
1. Navigate to the `backend` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file based on `.env.example` and configure your database connection.
4. Seed the database with sample events:
   ```
   node seed/seedEvents.js
   ```
5. Start the server:
   ```
   npm start
   ```

### Frontend
1. Navigate to the `frontend` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the React application:
   ```
   npm start
   ```

## API Endpoints

### Events
- **GET /api/events**: List all events with seat availability.
- **POST /api/events/book**: Book seats for an event.
- **DELETE /api/events/cancel/:bookingId**: Cancel a booking.
- **GET /api/events/user/:userId/bookings**: Fetch user-specific bookings.

## Example Interaction
1. User Action: Browse event list.
2. User selects an event with 50 available seats and books 3 seats.
3. System Response: 
   - Booking confirmation: 
     - Event: Music Concert 
     - Seats Booked: 3 
     - Remaining Seats: 47 
     - Booking ID: BKG1023

## Additional Notes
- For real-time updates, consider implementing WebSockets using Socket.io.
- Optional email confirmations can be sent using Nodemailer or a mock API.

## Testing
Unit tests for booking functionality are located in `backend/tests/booking.test.js`. Use a testing framework like Jest to run the tests.

## License
This project is licensed under the MIT License.
