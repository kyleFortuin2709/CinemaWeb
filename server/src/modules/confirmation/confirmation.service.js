const {
  booking,
} = require('../../adapters/database');
const {
  tmdbMovies,
  images
} = require('../../adapters/theMovieDB');


const getTime = (startDateTime) => {
  const date = new Date(startDateTime);
  return `${date.getHours() - 2}:${date.getMinutes()}`;
};

const getMovieDetails = (booking) => {
  return tmdbMovies.getMovieDetails(booking.apiMovieId)
  .then(result => {
    return {
      ...booking,
      title: result.title,
      posterPath: result.poster_path,
      backdropPath: result.backdrop_path
    }
  });
};

const getOtherImage = (booking) => {
  return images.getImagePosterFilePathByMovieId(booking.apiMovieId)
    .then(posterDetails => {
      return {
        ...booking,
        posterDetails
      };
    });
};

const getBooking = (refNo) => {
  return booking.getConfirmationDetails(refNo)
    .then(details => {
      const bookingDetail = details.find(() => true);
      let price = 0;
      let startDate = new Date(bookingDetail.startDateTime);
      let confirmation = {
        seats: [],
        apiMovieId: bookingDetail.apiMovieId,
        refNo: bookingDetail.refNo,
        movieId: bookingDetail.movieId,
        cinemaName: bookingDetail.cinemaName,
        date: startDate.getDate() + ' ' + startDate.toLocaleString('default', { month: 'long' }) + ", " + startDate.getFullYear()
      };
      details.forEach(detail => {
        price += detail.price;
        confirmation.startTime = getTime(detail.startDateTime);
        confirmation.endTime = getTime(detail.endDateTime);
        confirmation.seats.push(`${detail.seatRow.toUpperCase()}${detail.seatNumber}`);
      });
      confirmation.price = `R ${price}`;
      return confirmation;
    });
};

module.exports.confirmationService = {
  getBookingDetails: (refNo) => {
    return getBooking(refNo)
      .then(booking => {
        return getMovieDetails(booking)
          .then(data => {
            return getOtherImage(data);
          });
      });
  }
};