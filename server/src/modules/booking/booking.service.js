const {
  movies
} = require('../../adapters/database');

module.exports = {
  getMovie: (movieId) => {
    return movies.getMovieById(movieId)
  },
}