const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const Movie = require('../model/movie');

// Add a new movie (Admin only)
router.post('/movies', authenticate, authorize('admin'), async (req, res) => {
    const { title, description, showtimes } = req.body;

    try {
        const newMovie = new Movie({ title, description, showtimes });
        await newMovie.save();
        res.status(201).json({ message: 'Movie added successfully', movie: newMovie });
    } catch (error) {
        res.status(500).json({ error: 'Error adding movie' });
    }
});

// Delete a movie by ID (Admin only)
router.delete('/movies/:id', authenticate, authorize('admin'), async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.status(200).json({ message: 'Movie deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting movie' });
    }
});

module.exports = router;
