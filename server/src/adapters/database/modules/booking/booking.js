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
  }
}