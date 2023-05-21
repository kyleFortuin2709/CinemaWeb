
const {
  confirmationController
} = require('./confirmation.controller');

const confirmationRouter = require('express').Router();


confirmationRouter.get('/:refNo', (req, res, next) => {
  return confirmationController.getBookingDetails(req.params.refNo)
    .then(results => {
      return res.status(200).json(results)
    })
})

module.exports = {
  confirmationRouter
};

