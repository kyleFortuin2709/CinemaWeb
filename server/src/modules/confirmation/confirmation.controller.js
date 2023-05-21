const {
  confirmationService
} = require('./confirmation.service');

module.exports.confirmationController = {
  getBookingDetails: (refNo) => {
    return confirmationService.getBookingDetails(refNo)
  }
}