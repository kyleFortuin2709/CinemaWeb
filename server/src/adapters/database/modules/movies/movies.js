const { query } = require('../../service');

module.exports.movies = {
  getNowShowingMovies: () => {
    const date = new Date().toLocaleDateString('en-CA')
    const statement = `
      SELECT
        "id",
        "name",
        "apiMovieId",
        "startDate",
        "endDate"
      FROM "Movie"
      WHERE "startDate" <= '${date}'
      AND "endDate" >= '${date}'
    `;
    return query(statement)
      .then(results => {
        return results.recordset;
      })
  },
  getComingSoonMovies: () => {
    const date = new Date().toLocaleDateString('en-CA')
    const statement = `
      SELECT
        "id",
        "name",
        "apiMovieId",
        "startDate",
        "endDate"
      FROM "Movie"
      WHERE "startDate" > '${date}';
    `;
    return query(statement)
      .then(results => {
        return results.recordset;
      })
  },
}