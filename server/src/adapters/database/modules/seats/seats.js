const {
  query
} = require('../../service');

module.exports.seats = {
  getAllSeats: () => {
    const statement = `
      SELECT
        "id",
        "seatRow",
        "seatNumber"
      FROM "seat"
    `;
    return query(statement)
      .then(response => {
        return response.recordset;
      })
  }
}