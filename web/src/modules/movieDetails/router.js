const fs = require('fs').promises;

module.exports = {
  movieDetailsRouter: async (req, res) => {
    // if (!new URLSearchParams(req.url).get('movieId')) 
    //   throw new Error('Movie Id not found')
    return fs.readFile(__dirname + '/movieDetails.html')
  }
}
