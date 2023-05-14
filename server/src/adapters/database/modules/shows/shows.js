const { query } = require('../../service');

module.exports.shows = {
  getShows: () => {
    const statement = `
      SELECT
        "id",
        "startDateTime",
        "endDateTime"
      FROM shows
    `;
    return query(statement)
      .then(results => {
        return results.recordset;
      })
  }
}