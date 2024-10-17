// controllers/seatController.js
const Movie = require('../model/movie');

// Reserve Seats
exports.reserveSeats = async (req, res) => {
    try {
        const { movieId, seats } = req.body;

        // Find the movie by ID
        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        // Check if the requested seats are available
        const availableSeats = movie.availableSeats || [];
        const areSeatsAvailable = seats.every(seat => availableSeats.includes(seat));
        if (!areSeatsAvailable) {
            return res.status(400).json({ message: 'Some seats are already reserved' });
        }

        // Reserve the seats
        movie.availableSeats = availableSeats.filter(seat => !seats.includes(seat));
        await movie.save();

        res.status(200).json({ message: 'Seats reserved successfully', reservedSeats: seats });
    } catch (error) {
        res.status(500).json({ error: 'Failed to reserve seats', details: error.message });
    }
};
