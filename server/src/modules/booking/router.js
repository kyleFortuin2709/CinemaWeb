const {
  Router
} = require('express');
const {
  bookingController
} = require('./booking.controller');
const bookingRouter = Router();


bookingRouter.get('/movie/:id', (req, res, next) => {
  return bookingController.getDetailsForBooking(req.params.id)
    .then(bookingDetails => {
      return res.status(200).json(bookingDetails)
    });
});

bookingRouter.post('/', (req, res, next) => {
  console.log(req.body);
  return bookingController.addBooking(req.body)
    .then(result => {
      console.log("Result: " + JSON.stringify(result))
      return res.status(200).json(result)
    })
});

module.exports = {
  bookingRouter
};

