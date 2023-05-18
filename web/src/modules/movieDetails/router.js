const fs = require('fs').promises;

module.exports = {
  movieDetailsRouter: async (req, res) => {
    return fs.readFile(__dirname + '/movieDetails.html')
  }
}
