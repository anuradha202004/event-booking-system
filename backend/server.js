const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const eventRoutes = require('./routes/events.js');
const bookingRoutes = require('./routes/bookings.js');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Database connection
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});