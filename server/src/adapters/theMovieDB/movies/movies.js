const {
  apiCall
} = require('../service');


module.exports.movies = {
  getMovieDetails: (movieId) => {
    return apiCall({path: movieId})
  }
}