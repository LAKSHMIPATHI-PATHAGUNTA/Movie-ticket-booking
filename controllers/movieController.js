// controllers/movieController.js
const Movie = require('../model/movie');

// Add a Movie
exports.addMovie = async (req, res) => {
    try {
        const { title, description, showtime } = req.body;

        // Create a new movie document
        const newMovie = new Movie({ title, description, showtime });

        // Save the movie
        await newMovie.save();
        res.status(201).json({ message: 'Movie added successfully', movie: newMovie });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add movie', details: error.message });
    }
};

// Delete a Movie
exports.deleteMovie = async (req, res) => {
    try {
        const { movieId } = req.params;

        // Find and delete the movie
        const deletedMovie = await Movie.findByIdAndDelete(movieId);
        if (!deletedMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        res.status(200).json({ message: 'Movie deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete movie', details: error.message });
    }
};
