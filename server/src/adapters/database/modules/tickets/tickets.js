const {
  query
} = require('../../service');
  
module.exports.tickets = {
  createTickets: (data) => {
    const values = data.movieSeats.map(movieSeat => {
      return `(${data.cinemaMovieId},${data.bookingId},${125.00},${movieSeat.id})`
    }).join(',')
    const statement = `
      INSERT INTO "Ticket"("cinemaMovieId","bookingId","price","movieSeatId")
      VALUES
        ${values}
      SELECT
        "id",
        "cinemaMovieId",
        "bookingId",
        "price",
        "movieSeatId"
      FROM "Ticket"
      WHERE "bookingId" = ${data.bookingId}
    `;
    return query(statement)
      .then(response => {
        return response.recordset;
      });
  }
};