const fs = require('fs').promises;

module.exports = {
  confirmationRouter: (req, res) => {
    return fs.readFile(__dirname + '/confirmation.html')
  }
};
