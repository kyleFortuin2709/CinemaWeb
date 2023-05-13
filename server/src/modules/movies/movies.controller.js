const {
  getMovieDetails
} = require('./movies.service');

module.exports.moviesController = {
  getMovieDetails: (apiMovieId) => {
    return getMovieDetails(apiMovieId)
  }
}