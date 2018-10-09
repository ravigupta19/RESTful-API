const mongoose = require('mongoose');

const genreSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
  }
});

const movieSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 60,
  },
  genre: {
    type: genreSchema,
    required: true,
  },
  numberInStock: {
    type: Number,
    require: true,
    min: 0,
    max: 255,
  },
  dailyRentalRate: {
    type: Number,
    require: true,
    min: 0,
    max: 255,
  },
});

const Movies = mongoose.model('Movies', movieSchema);

module.exports = Movies;
