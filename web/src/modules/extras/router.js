const fs = require('fs').promises;

module.exports = {
  extrasRouter: async (req, res) => {
    return fs.readFile(__dirname + '/extras.html')
  }
};
