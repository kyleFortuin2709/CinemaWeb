const {
   extrasService
} = require('./extras.service');

module.exports.extrasController = {
  getAll: () => {
    return extrasService.getAllExtras();
  }
}