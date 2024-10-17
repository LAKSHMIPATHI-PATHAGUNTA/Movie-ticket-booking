const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');

router.post('/reservations', authenticate, async (req, res) => {
    // Logic to reserve seats for a showtime
    res.status(201).json({ message: 'Reservation successful' });
});

module.exports = router;
