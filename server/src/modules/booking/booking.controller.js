const {
  getMovie,
  getCinemaMoviesSeats,
  getCinemaMovieDetails,
  mapBooking,
  getShows,
  mapSeats,
  createTickets,
  createBooking,
  bookMovieSeats,
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
  },
  addBooking: (data) => {
    return Promise.all([
      bookMovieSeats(data),
      createBooking(data.email)
    ]).then(([movieSeats, booking])=> {
      return createTickets({
        movieSeats,
        cinemaMovieId: data.cinemaMovieId,
        bookingId: booking.id,
      })
      .then(() => {
        return booking;
      });
    });
    // return mapSeats(data.seatIds)
    //   .then(seats => {
    //     data.seatIds = seats
    //   });
  }
};