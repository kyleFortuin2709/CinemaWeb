const {
  getMovie
} = require('./booking.service');

module.exports.bookingController = {
  getDetailsForBooking: (movieId) => {
    return getMovie(movieId);
  }
}