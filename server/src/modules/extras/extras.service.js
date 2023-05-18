const {
  extras
} = require('../../adapters/database')


module.exports.extrasService = {
  getAllExtras: () => {
    return extras.getAllExtras();
  }
};