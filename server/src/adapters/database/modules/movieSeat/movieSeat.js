const {
  query
} = require('../../service');

module.exports.movieSeat = {
  getMovieSeatsByCinemaMovieId: (cinemaMovieId) => {
    const statement = `
      SELECT
        "id",
        "showId",
        "booked",
        "seatId",
        "cinemaMovieId"
      FROM "MovieSeat"
      WHERE "cinemaMovieId" = ${cinemaMovieId}
    `;
    return query(statement)
      .then(results => {
        return results.recordset;
      })
  },
  bookMovieSeats: (data) => {
    const conditions = data.seatIds.join(', ')
    const statement = `
      UPDATE "MovieSeat"
        SET "booked" = 1
      WHERE "cinemaMovieId" = ${data.cinemaMovieId}
      AND "showId" = ${data.showId}
      AND "seatId" IN (${conditions})
      SELECT
        "id",
        "showId",
        "booked",
        "seatId",
        "cinemaMovieId"
      FROM "MovieSeat"
      WHERE "cinemaMovieId" = ${data.cinemaMovieId}
      AND "showId" = ${data.showId}
      AND "seatId" IN (${conditions})
    `;
    return query(statement)
      .then(results => {
        return results.recordset;
      });
  }
};