// const {
//   Router
// } = require('express');
// const path = require('path');

// const bookingRouter = Router();

// bookingRouter.get('/', (req, res, next) => {
//   console.log(path.join(__dirname, '/booking.html'));
//   return res.render(path.join(__dirname, '/booking.html'), {welcome: "Hello!"});
// });


// bookingRouter.get('/postBooking', (req, res) => {
//   return postBooking()
//     .then(data => {
//       return true
//     })
// });

// module.exports = {
//   bookingRouter
// }
const fs = require('fs').promises;
module.exports = {
  bookingRouter: async (req, res) => {
    return fs.readFile(__dirname + '/booking.html')
  }
}
