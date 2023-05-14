const {
  query
} = require('../../service');

module.exports.cinemaMovieView = {
  getDetails: (movieId) => {
    const statement = `
      SELECT
        "cinemaMovieId",
        "showId",
        "startDateTime"
      FROM "CinemaMovieView"
      WHERE "movieId" = ${movieId}
    `;
    return query(statement)
      .then(results => {
        return results.recordset;
      })
  }
}