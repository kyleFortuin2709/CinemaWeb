const {
  query
} = require('../../service');
  
module.exports.booking = {
  postBooking : () => {
    const statement = `
      SELECT * FROM CinemaComplexView
    `;
    return query(statement)
      .then(response => {
        console.log(response);
        return response.recordset;
      })
  },
  getBooking: (refNo) => {
    const statement = `
      SELECT
        "id",
        "email",
        "refNo"
      FROM "Booking"
      WHERE "refNo" = '${refNo}'
    `;
    return query(statement)
      .then(response => {
        return response.recordset.find(() => true);
      });
  },
  createBooking: () => {
    const statement = `
      INSERT INTO "Booking"("email")
      VALUES('mariusTestBooking@bookings.co.za')
      SELECT
        "id",
        "email",
        "refNo"
      FROM "Booking"
      WHERE "id" = SCOPE_IDENTITY()
    `;
    return query(statement)
      .then(response => {
        return response.recordset.find(() => true);
      });
  },
  getConfirmationDetails: (refNo) => {
    const statement = `
      SELECT
        "refNo",
        "price",
        "seatId",
        "seatRow",
        "seatNumber",
        "startDateTime",
        m."id" AS "movieId",
        "apiMovieId"
      FROM Booking b
      JOIN Ticket t
      ON t."bookingId" = b."id"
      JOIN MovieSeat ms
      ON ms."id" = t."movieSeatId"
      JOIN Seat s
      ON s."id" = ms."seatId"
      JOIN Shows sh
      ON sh."id" = ms."showId"
      JOIN Movie m
      ON m."id" = (
        SELECT 
          "movieId"
        FROM CinemaMovie
        WHERE "id" = t."bookingId"
      )
      WHERE b."refNo" = '${refNo}'
    `;
    return query(statement)
      .then(response => {
        return response.recordset;
      });
  }
}