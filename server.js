const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movies');
const seatRoutes = require('./routes/seats');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Root Route
app.get('/', (req, res) => {
    res.send('Welcome to the Movie Ticket Booking App!');
});

// Route Configurations
app.use('/api/auth', authRoutes); // User authentication routes
app.use('/api/movies', movieRoutes); // Movie management routes
app.use('/api/seats', seatRoutes); // Seat reservation routes

// Database Connection
const dburi="mongodb+srv://rajasekharnaidu:1QjXlCYuLakZpW7E@cluster0.sfeiqlr.mongodb.net/";
mongoose.connect(dburi)
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.error('Database connection error:', err));

// Server Setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
