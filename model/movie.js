const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    showtimes: [{ type: Date, required: true }]
});

module.exports = mongoose.model('Movie', MovieSchema);
