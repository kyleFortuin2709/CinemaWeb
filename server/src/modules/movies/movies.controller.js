const {
  getMovieDetails,
  getMovie
} = require('./movies.service');

module.exports.moviesController = {
  getMovieDetails: (movieId) => {
    return getMovie(movieId)
      .then(movie => {
        return getMovieDetails(movie.apiMovieId)
      })
  }
}