const {
  query
} = require('../../service');

module.exports.cinemaMovieView = {
  getDetails: (movieId) => {
    const statement = `
      SELECT
        "cinemaMovieId",
        "cinemaComplexId",
        "complexId",
        "complexName",
        "cinemaId",
        "cinemaName",
        "movieId",
        "name",
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