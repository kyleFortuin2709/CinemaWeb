const {
  query
} = require('../../service');

module.exports.cinemas = {
  getAllCinemas : () => {
    const statement = `
      SELECT * FROM CinemaComplexView
    `;
    return query(statement)
      .then(response => {
        console.log(response);
        return response;
      })
  }
}