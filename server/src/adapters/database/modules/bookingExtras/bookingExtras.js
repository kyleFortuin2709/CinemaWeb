const {
  query
} = require('../../service');

module.exports.bookingExtras = {
  saveItemPurchase: (data) => {
    const statement = `
      INSERT INTO "BookingExtras" ("bookingId", "extrasId")
      VALUES (${data.bookingId}, ${data.extrasId})
    `;
    return query(statement)
      .then(response => {
        console.log(response);
        return response.recordset;
      })
  }
}