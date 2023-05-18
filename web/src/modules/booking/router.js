const fs = require('fs').promises;

module.exports = {
  bookingRouter: async (req, res) => {
    return fs.readFile(__dirname + '/booking.html');
  }
}
