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
  }
}