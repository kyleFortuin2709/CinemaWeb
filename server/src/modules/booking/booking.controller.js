const {
  getMovie,
  getCinemaMoviesSeats,
  getCinemaMovieDetails,
  mapBooking,
  getShows
} = require('./booking.service');

module.exports.bookingController = {
  getDetailsForBooking: (movieId) => {
    return Promise.all([
      getMovie(movieId),
      getCinemaMovieDetails(movieId),
      getShows()
    ]).then(([movie, cinemaMovieDetails, shows]) => {
      return getCinemaMoviesSeats(cinemaMovieDetails)
        .then(cinemaMoviesDetails => {
          return mapBooking(cinemaMoviesDetails, movie, shows);
        });
    });
  }
};