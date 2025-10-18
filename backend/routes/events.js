const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController.js');

// Route to list all events with seat availability
router.get('/', eventController.getAllEvents);

// Route to get a specific event by ID
router.get('/:id', eventController.getEventById);

module.exports = router;