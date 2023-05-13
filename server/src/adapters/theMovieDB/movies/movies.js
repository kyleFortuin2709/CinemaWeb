const {
  apiCall
} = require('../service');


module.exports.tmdbMovies = {
  getMovieDetails: (movieId) => {
    return apiCall({path: movieId})
  }
}